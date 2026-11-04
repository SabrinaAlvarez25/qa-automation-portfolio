# Revisión de `tests/api/petstore.spec.ts`: independencia de los tests

> **Estado:** análisis. **No representa una implementación.**
> Ningún test, fixture, servicio ni configuración fue modificado como parte de esta revisión.
> Las recomendaciones son **propuestas pendientes de aprobación**.

## Cómo se elaboró este informe

El informe se elaboró con ayuda de un equipo de agentes de Claude Code (Agent Teams de prueba), que trabajó en modo **solo lectura**: no modificó archivos ni ejecutó comandos ni tests.

- **Compañero 1 (estructura de los tests):** recorrió la configuración, las carpetas, las fixtures y los specs, y detectó la dependencia entre los tests de Petstore.
- **Compañero 2 (Page Objects):** revisó `pages/` y cómo lo usan los specs. No incluyó hallazgos sobre Petstore.
- **Análisis en detalle:** a partir de ese hallazgo, el agente principal leyó `tests/api/petstore.spec.ts` y redactó este informe.

> Nota técnica: los compañeros fueron subagentes independientes que le entregaron su informe al agente principal. No se comunicaron entre sí, como sí lo hacen en la función experimental "Agent Teams" de Claude Code.

## 1. Contexto

`tests/api/petstore.spec.ts` prueba la API pública de Swagger Petstore (`https://petstore.swagger.io/v2`) con `request` de Playwright, usando una constante `BASE_URL` absoluta (línea 3). No usa services ni fixtures propias.

La configuración actual (`playwright.config.ts`) usa `workers: 1`, `fullyParallel: false` y `retries: process.env.CI ? 2 : 0`.

## 2. Qué hace cada test

| Test | Líneas | ¿Es independiente? |
|---|---|---|
| `GET /pet/findByStatus`: filtrar por estado | 19-34 | No depende de otros tests, pero sí de los datos que haya en la API pública (`body.length > 0`, `body[0]`) |
| `POST /pet`: crear una mascota | 36-49 | Sí, pero deja basura: la mascota creada nunca se borra si no corre el DELETE |
| `GET /pet/{petId}`: consultar la mascota creada | 51-58 | **No:** necesita que el POST haya corrido antes |
| `GET /pet/{petId}`: 404 con una mascota inexistente | 60-65 | Sí (usa un ID fijo) |
| `DELETE /pet/{petId}`: eliminar la mascota creada | 67-75 | **No:** necesita que el POST haya corrido antes, y el GET por ID debe correr antes que él |

## 3. Por qué los tests dependen entre sí

### 3.1 El estado vive en el `describe`, no en cada test

`uniquePetId = Date.now()` y el objeto `testPet` (líneas 6-17) se declaran una sola vez en el `describe` y los comparten todos los tests. Pero solo el POST crea la mascota en el servidor. El GET por ID y el DELETE suponen que ya existe, así que dependen de dos cosas:

- **El orden de ejecución:** POST, después GET y al final DELETE.
- **Que todos corran en el mismo proceso** (worker).

### 3.2 `Date.now()` se evalúa cada vez que se carga el archivo

Playwright carga el archivo de test **en cada worker**. Cuando un test falla, el reintento corre en un **worker nuevo**, que vuelve a cargar el archivo. Por eso el valor de `uniquePetId` no es el mismo durante toda la ejecución: cambia en cada carga.

### 3.3 Cuándo se rompe

| Situación | Qué pasa |
|---|---|
| **Reintento en CI** (`retries: 2`) | El GET por ID reintentado recibe un `uniquePetId` nuevo que nunca se creó. Falla siempre con 404, aunque el error original haya sido un problema de red pasajero |
| **Ejecución aislada** (`--grep "consultar la mascota"`, un solo test desde la UI o desde el IDE) | El GET por ID y el DELETE corren sin el POST y dan 404 |
| **Paralelismo** (`fullyParallel: true` o más de un worker) | Cada worker tiene su propio ID y los tests pueden correr en cualquier orden |
| **Falla el POST** | El GET por ID y el DELETE también fallan. El informe muestra 3 fallos cuando la causa es una sola |

Hoy los tests pasan solo porque se dan tres condiciones a la vez: `workers: 1`, `fullyParallel: false` y el orden en que están escritos en el archivo.

## 4. Problemas secundarios

- **`findByStatus` depende de datos de terceros.** Si en ese momento no hay mascotas `available`, o si `body[0]` viene incompleta (en el sandbox público pasa), el test falla sin que haya un bug real.
- **El ID `99999999999999` del test 404 está fijo.** Cualquiera podría crear una mascota con ese ID en la API pública. Es poco probable, pero posible.
- **El POST no limpia lo que crea.** Si el DELETE no corre, la mascota queda en el servidor.
- **Petstore público es inestable:** tiene varias instancias detrás, y un GET justo después del POST a veces da 404 temporalmente. Esto no lo causa la dependencia entre tests, pero conviene tenerlo en cuenta al diseñar la solución.

## 5. Alternativas de mejora

### 5.1 Recomendada: cada test prepara y limpia sus propios datos (fixture `mascota`)

Crear una fixture con `test.extend` que:

1. genere un ID único **dentro de cada test** (por ejemplo `Date.now()` más un número aleatorio);
2. cree la mascota con POST antes del test (*setup*);
3. se la entregue al test;
4. la borre con DELETE al terminar, **aunque el test falle** (*teardown*), sin exigir que el DELETE dé 200, porque el test de DELETE ya la habrá borrado.

Cambio propuesto en cada test:

| Test | Cambio |
|---|---|
| POST | Arma su propia mascota con un ID nuevo y la borra al final. No usa la fixture, porque crear es justamente lo que prueba |
| GET por ID | Usa la fixture `mascota`; ya no depende del POST |
| DELETE | Usa la fixture `mascota`, la borra y verifica el 404 |
| GET 404 | Usa un ID generado y lo borra antes (o confirma que no existe), en lugar del número fijo |
| findByStatus | Crea su propia mascota con un estado concreto, o al menos verifica que **todas** las mascotas devueltas tengan el estado pedido, en lugar de exigir que `body[0]` exista |

Boceto de referencia (**no implementado**):

```ts
type Mascota = { id: number; name: string; status: string; /* ... */ };

const test = base.extend<{ mascota: Mascota }>({
  mascota: async ({ request }, use) => {
    const nueva = crearDatosMascota();           // ID único por test
    const res = await request.post(`${BASE_URL}/pet`, { data: nueva });
    expect(res.ok()).toBeTruthy();
    await use(nueva);
    await request.delete(`${BASE_URL}/pet/${nueva.id}`); // limpieza, tolera 404
  },
});
```

Para el 404 temporal justo después del POST, se propone usar `expect.poll` en el GET por ID: reintenta hasta que la mascota aparezca, en lugar de suponer que ya está disponible.

### 5.2 Alternativa rápida, no recomendada como solución final: modo serial

```ts
test.describe.configure({ mode: 'serial' });
```

Deja explícita la dependencia y hace que Playwright saltee el resto si el POST falla. Pero los tests siguen dependiendo entre sí y no se pueden ejecutar de forma aislada. Solo hace más visible el problema.

## 6. Archivos que habría que modificar

**Opción mínima:**

- `tests/api/petstore.spec.ts`: la fixture se define en el mismo archivo con `test.extend`, y se reescriben los 5 tests.

**Opción más prolija (opcional),** siguiendo el patrón de `services/` que ya usa la academia:

- `services/petstore.service.ts` (nuevo): métodos `crear`, `obtener`, `borrar` y `buscarPorEstado`.
- `tests/api/petstore.fixtures.ts` (nuevo): la fixture `mascota`. Se recomienda **no** ponerla en `tests/fixtures.ts`, porque ese archivo está atado a la `baseURL` de la academia.

**No hace falta tocar** `playwright.config.ts`. Cuando las apps se separen en `projects`, Petstore podrá tener su propia `baseURL` y la constante `BASE_URL` va a sobrar, pero ese cambio conviene hacerlo aparte.

## 7. Recomendaciones (pendientes de aprobación)

> Ninguna de estas recomendaciones está implementada. Son propuestas y requieren aprobación antes de cualquier cambio.

1. **Alta:** introducir la fixture `mascota` con setup y teardown, para que el GET por ID y el DELETE no dependan del POST ni del orden de ejecución.
2. **Alta:** generar el ID de la mascota dentro de cada test, y no en el `describe`, para que los reintentos y la ejecución aislada funcionen.
3. **Media:** hacer que el POST limpie la mascota que crea.
4. **Media:** que `findByStatus` deje de depender de los datos de terceros y no exija que `body[0]` exista.
5. **Media:** usar `expect.poll` en las consultas que siguen a una creación, por la inestabilidad del sandbox público.
6. **Baja:** reemplazar el ID fijo del test 404 por uno generado y garantizado como inexistente.
7. **Baja (opcional):** extraer `services/petstore.service.ts` y `tests/api/petstore.fixtures.ts`, siguiendo el patrón del resto del repositorio.
8. **Posterior, en un cambio aparte:** crear un `project` propio para Petstore en `playwright.config.ts`, con su `baseURL`.

La primera validación propuesta, una vez aprobado e implementado el cambio, es correr cada test de Petstore de forma aislada (`--grep`) y con `--repeat-each` y varios workers, para confirmar que ninguno depende de otro.
