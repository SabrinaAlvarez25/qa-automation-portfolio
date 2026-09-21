> **Procedencia histórica.** Copia local de `Clase 06/recursos-s6/observaciones/muestras-verificadas.md`, incorporada a C7 para que esta entrega sea autocontenida. Conserva las fechas, comandos y resultados históricos de C6; **no sustituye una reverificación antes de dictar**. Cuando se use como fuente, marca la observación como **heredada**, no propia.
>
# Muestras verificadas — API de Academia sin Humo

> **Fecha de captura: 2026-08-17. Reverificadas el 2026-08-18** las siete respuestas que usa el
> bloque 4: los cinco casos de `POST /api/enroll`, `GET /api/enroll` (405) y `GET /api/courses`
> (200). Todas siguen dando lo mismo, **incluida la discrepancia principal del caso 5**. El resto del
> archivo conserva la captura del 17.
>
> Todas las respuestas se obtuvieron ejecutando los comandos que están al lado, contra
> `https://playground.calidadsinhumo.com`.
>
> **Para qué sirve este archivo.** Es el Plan B de la clase: si el playground no responde, se trabaja
> sobre estas muestras y se marca que la observación es **heredada**, no propia.
>
> **Advertencia importante.** Una muestra no es una regla. Estas respuestas describen lo que el
> producto hizo esas dos fechas, no lo que va a hacer siempre. De hecho, el 11 de agosto el body
> vacío de `/api/enroll` devolvía `500` y desde el 17 devuelve `400`: alguien lo corrigió. Volver a
> ejecutar antes de dictar.
>
> **Procedencia de la nota de Swagger.** En C6 existían muestras de ejemplo contra Petstore, con la
> misma disciplina de fecha y comando. No forman parte de esta entrega de C7 ni son necesarias para
> sus actividades; esta copia no depende de una ruta externa.

---

## Cómo leer el status con curl

```bash
curl -s -w "\nHTTP %{http_code}\n" <url>
```

`-s` calla la barra de progreso. `-w "\nHTTP %{http_code}\n"` imprime el status al final. Sin esa
parte, curl muestra el body y el status no se ve.

Para ver los headers de la respuesta en lugar del body:

```bash
curl -s -D - -o /dev/null <url>
```

---

## 1. `GET /api/courses`

```bash
curl -s -w "\nHTTP %{http_code}\n" https://playground.calidadsinhumo.com/api/courses
```

**HTTP 200.** Devuelve `{"courses":[...],"total":11}`. Cada curso trae `id`, `title`, `description`,
`level`, `duration`, `prerequisiteId`, `maxStudents`, `enrolled`, `icon`.

Headers de la respuesta observados:

```text
HTTP/2 200
content-type: application/json
cache-control: public, max-age=0, must-revalidate
server: Vercel
```

Catálogo observado (útil para elegir casos):

| id | prerequisiteId | enrolled / maxStudents |
|---|---|---|
| `fundamentos` | — | 24 / 30 |
| `playwright-cero` | `fundamentos` | 22 / 25 |
| `diseno-casos` | `fundamentos` | 15 / 20 |
| `api-testing` | `playwright-cero` | **20 / 20 (sin cupo)** |
| `ci-cd-qa` | `playwright-cero` | 8 / 15 |
| `liderazgo-qa` | `diseno-casos` | 14 / 15 |
| `programacion-qa` | — | 0 / 20 |
| `playwright-cazador-bugs` | `playwright-cero` | 0 / 20 |
| `ia-para-qa` | `playwright-cazador-bugs` | 0 / 20 |
| `api-cazador-bugs` | `ia-para-qa` | 0 / 20 |
| `ci-cd-para-qa` | `playwright-cazador-bugs` | 0 / 20 |

**Dato relevante:** los números de `enrolled` **no cambian** después de inscribirse por API. Se
verificó pidiendo el catálogo antes y después de tres inscripciones. REQ-C04 dice que los cupos
disponibles deben reducirse en 1.

---

## 2. `POST /api/enroll` — los cinco casos de REQ-A03

### Caso 1 · Inscripción exitosa

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{"courseId":"fundamentos"}'
```

**HTTP 200**

```json
{"courseId":"fundamentos","status":"inscrito","displayStatus":"inscrito","progress":0,
 "certificates":0,"enrolledAt":1786927439239,
 "message":"Inscripción exitosa a \"Fundamentos de Testing\"","spotsLeft":6}
```

Coincide con la spec.

### Caso 2 · Falta el campo obligatorio

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{}'
```

**HTTP 400** — `{"error":"El campo courseId es obligatorio"}`

Coincide con la spec. (El 11 de agosto este mismo caso devolvía `500`.)

### Caso 3 · Curso que no existe

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{"courseId":"no-existe"}'
```

**HTTP 404** — `{"error":"Curso no encontrado"}`

Coincide con la spec. Mismo resultado con `{"courseId":123}`.

### Caso 4 · Sin cupos

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{"courseId":"api-testing"}'
```

**HTTP 200**

```json
{"courseId":"api-testing","status":"lista-espera","displayStatus":"inscrito","progress":0,
 "certificates":0,"enrolledAt":1786927450800,
 "message":"Sin cupos para \"API Testing con Playwright\". Agregado a lista de espera.","spotsLeft":0}
```

El status y el campo `status` coinciden con REQ-A03. Pero el campo `displayStatus` dice `inscrito`, y
REQ-C05 pide que en lista de espera se muestre "Lista de espera" y **no** "Inscrito". Es una segunda
discrepancia, más fina, escondida dentro de un body que a primera vista parece correcto.

### Caso 5 · Prerequisito no completado — **la discrepancia principal**

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{"courseId":"playwright-cero"}'
```

**HTTP 200**

```json
{"courseId":"playwright-cero","status":"inscrito","displayStatus":"inscrito",
 "message":"Inscripción exitosa a \"Playwright desde cero\"","spotsLeft":3}
```

La spec dice `403` (REQ-A03), y REQ-C06 dice explícitamente que la API debe aplicar las mismas reglas
que la UI. El producto responde `200 inscrito`.

Se verificó **con y sin** cookie de sesión: el resultado es el mismo. También con
`api-cazador-bugs`, que requiere `ia-para-qa`: **200 inscrito**. El `403` no se produce nunca.

### Casos extra, fuera de la spec

```bash
# Método equivocado
curl -s -o /dev/null -w "HTTP %{http_code}\n" https://playground.calidadsinhumo.com/api/enroll
# HTTP 405

# Body con JSON malformado
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/enroll \
  -H "Content-Type: application/json" -d '{courseId'
# HTTP 500
```

`405` es la respuesta correcta a un método no permitido, pero **la spec no lo documenta**: es una
incógnita, no una discrepancia. El `500` del body malformado sí es sospechoso: un cliente que manda
basura debería recibir un `4xx`, no un `5xx`. Tampoco está en la spec.

---

## 3. `POST /api/login`

### Credenciales válidas

```bash
curl -s -D - -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana.garcia@ejemplo.com","password":"Segura2026!"}'
```

**HTTP 200** — `{"message":"Login exitoso","user":{"name":"Ana García","email":"ana.garcia@ejemplo.com","age":"28"}}`

Header de respuesta más importante:

```text
set-cookie: ash_session=<valor largo>; Path=/; Max-Age=14400; Secure; HttpOnly; SameSite=lax
```

`HttpOnly` significa que el JavaScript de la página no puede leer esa cookie. `Secure`, que solo viaja
por HTTPS. `Max-Age=14400`, que dura cuatro horas.

### Contraseña incorrecta

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana.garcia@ejemplo.com","password":"malamala"}'
```

**HTTP 401** — `{"error":"Email o contraseña incorrectos","attempts":1,"remaining":4}`

El body cuenta los intentos: es REQ-L03 (rate limiting) visible desde la API. **Cuidado en clase:** a
los 5 intentos fallidos la cuenta se bloquea 30 segundos.

### Body vacío

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST https://playground.calidadsinhumo.com/api/login \
  -H "Content-Type: application/json" -d '{}'
```

**HTTP 400** — `{"error":"Email y contraseña son obligatorios"}`

---

## 4. Endpoints descubiertos por observación

Estos dos **no están en la documentación**. Aparecieron mirando la pestaña Network durante el login.

```bash
# Guardar la cookie y usarla después
curl -s -c cookies.txt -X POST https://playground.calidadsinhumo.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana.garcia@ejemplo.com","password":"Segura2026!"}'

curl -s -b cookies.txt -w "\nHTTP %{http_code}\n" https://playground.calidadsinhumo.com/api/auth/me
# HTTP 200 — {"realUser":null}

curl -s -b cookies.txt -w "\nHTTP %{http_code}\n" https://playground.calidadsinhumo.com/api/progress
# HTTP 200 — {"enrollments":[],"total":0}
```

`GET /api/auth/me` devuelve `{"realUser":null}` **con la cookie recién emitida por el login**. Es
decir: el login entrega una sesión que el propio endpoint de sesión no reconoce. Toca REQ-S01.

`GET /api/progress` devuelve la lista vacía aunque se hayan hecho inscripciones por API. Es coherente
con que `enrolled` no cambie en el catálogo: el servidor no guarda las inscripciones.

---

## 5. Rutas que no existen

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" https://playground.calidadsinhumo.com/api/reservas
# HTTP 404
```

Lo mismo con `/api/perfil` y `/api/users`. Si aparecen en algún material, es material viejo.

---

## Resumen para la docente

| Fila del contrato | Spec | Observado | Estado |
|---|---|---|---|
| enroll · caso feliz | 200 `inscrito` | 200 `inscrito` | coincide |
| enroll · falta campo | 400 | 400 | coincide |
| enroll · curso inexistente | 404 | 404 | coincide |
| enroll · sin cupo | 200 `lista-espera` | 200 `lista-espera` + `displayStatus:"inscrito"` | discrepancia fina (REQ-C05) |
| enroll · prerequisito pendiente | **403** | **200 `inscrito`** | **discrepancia principal** |
| enroll · método GET | sin fuente | 405 | incógnita |
| enroll · JSON malformado | sin fuente | 500 | incógnita con sospecha |
| courses · cupos tras inscribirse | REQ-C04: baja en 1 | no cambia | discrepancia |
| auth/me con cookie válida | REQ-S01 | `{"realUser":null}` | discrepancia |

Tres de cinco filas coinciden. Eso importa pedagógicamente: **el producto no está roto**. Verificar no
es buscar errores, es poder respaldar lo que se afirma.
