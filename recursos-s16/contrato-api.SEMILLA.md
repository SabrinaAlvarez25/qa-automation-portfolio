# Contrato de la API — Academia sin Humo

> ## 🔵 Versión C16 — con lo que se agregó en clase
>
> Este es el mismo archivo que recibiste en C6, con **dos cosas agregadas el 2026-08-18**, las dos
> escritas por QA y no por el producto:
>
> 1. En la **§0**, la fila de `GET /api/students`, descubierta en Network siguiendo el procedimiento
>    de la §8 de este mismo archivo.
> 2. En la **§4**, las **tres discrepancias** de REQ-N01, REQ-N02 y REQ-N03, más la de REQ-C05.
>
> Si ya tienes tu propio `contrato-api.md` con tus discrepancias escritas, **no lo pises**: copia
> solo las filas que te falten. Este archivo existe para que faltar a una clase no te bloquee.

> **Este documento te lo dan.** No lo escribes tú.
>
> Es la documentación del producto, exportada tal como la entrega el equipo que construyó la API.
> En tu trabajo llega igual: como un PDF, una página de Confluence, un Swagger o un mensaje de un
> desarrollador. Cambia el formato, no cambia lo que tienes que hacer con él: **leerlo, usarlo y
> verificarlo.**

**Base URL:** `https://playground.calidadsinhumo.com`
**Fuente del documento:** `https://playground.calidadsinhumo.com/documentacion` — secciones 3, 5 y 6
**Entregado por:** equipo de producto de Academia sin Humo
**Copiado a este repositorio el:**

---

## Cómo se lee este archivo

| Sección | Quién la escribe | Qué contiene |
|---|---|---|
| 0 a 3 | **el producto** | lo que la API **promete**. Llega escrito. No lo edites. |
| **4 · Discrepancias observadas** | **tú, QA** | lo que el producto **hizo** cuando lo ejecutaste, cuando no coincide con la promesa |
| **5 · Lo que el contrato no define** | **tú, QA** | los huecos: casos que ocurren y que este documento no cubre |
| 6 a 9 | procedimiento | cómo interrogarlo, el gate, qué hacer si no te dan contrato, adónde va |

**Las tres advertencias que hay que decir en voz alta:**

1. Todo lo que dicen las secciones 0 a 3 es una **promesa**. Nadie verificó todavía que el producto
   la cumpla.
2. Un contrato dado **no prueba nada**. Prueba que alguien escribió lo que debería pasar.
3. La única forma de saber si el producto cumple es **ejecutar**. Eso es lo tuyo, y por eso las dos
   únicas secciones que escribes son la 4 y la 5.

---

## 0. Superficie declarada de la API

| Método | Ruta | De dónde salió | Para qué |
|---|---|---|---|
| POST | `/api/login` | documentación · sección 2 | iniciar sesión; devuelve la cookie `ash_session` |
| POST | `/api/enroll` | documentación · REQ-A01 | inscribirse a un curso |
| GET | `/api/courses` | **observación en Network** — REQ-C01 define qué muestra el catálogo, no el endpoint que lo alimenta | listar cursos con cupos y prerequisitos |
| GET | `/api/auth/me` | **observación en Network** — no está documentado | quién es la sesión actual |
| GET | `/api/progress` | **observación en Network** — no está documentado | inscripciones y progreso |
| GET | `/api/students` | **observación en Network** — 2026-08-18. REQ-N01 a N03 describen la pantalla `/estudiantes`, no el endpoint | listado paginado de estudiantes; acepta `?page=` y `?pageSize=` |

> **Ya hay una lección acá.** De los seis endpoints que existen, **la documentación nombra dos**.
> Los otros tres aparecieron mirando la pestaña Network mientras alguien usaba la aplicación. Un
> contrato dado casi nunca cubre toda la superficie real: cubre lo que alguien se acordó de escribir.

Rutas que **no existen** aunque aparezcan en materiales viejos: `/api/reservas`, `/api/perfil`,
`/api/users`. Las tres devuelven `404`.

---

## 1. POST /api/enroll — el endpoint del día

**Qué envía (REQ-A01):** un body JSON con el campo `courseId`.

**Qué debe validar (REQ-A02):** que el curso exista, que haya cupos y que el prerequisito esté
completado. Textual del documento: *"Las mismas reglas que la UI"*.

**Las cinco respuestas esperadas (REQ-A03):**

| # | Caso | Body que se envía | Status que promete la spec | Respuesta documentada | REQ |
|---|---|---|---|---|---|
| 1 | Inscripción exitosa | `{"courseId":"fundamentos"}` | `200` | `status: "inscrito"` | REQ-A03 |
| 2 | Falta el campo obligatorio | `{}` | `400` | `El campo courseId es obligatorio` | REQ-A03 · REQ-A01 |
| 3 | Curso que no existe | `{"courseId":"no-existe"}` | `404` | `Curso no encontrado` | REQ-A03 |
| 4 | Sin cupos | `{"courseId":"api-testing"}` | `200` | `status: "lista-espera"` | REQ-A03 · REQ-C02 |
| 5 | Prerequisito no completado | `{"courseId":"playwright-cero"}` | `403` | rechazo por prerequisito pendiente | REQ-A03 · REQ-C03 · REQ-C06 |

**Tabla de decisión de REQ-C02** — así llega escrita en la documentación:

| Prerequisito completado | Cupo disponible | Resultado esperado |
|---|---|---|
| Sí | Sí | Inscrito |
| Sí | No | Lista de espera |
| No | Sí | Rechazado (prerequisito pendiente) |
| No | No | Rechazado |

**Regla que conecta las dos capas (REQ-C06):** *"La API de inscripción (`POST /api/enroll`) debe
aplicar las mismas reglas de validación que la UI. Un curso con prerequisito pendiente debe ser
rechazado tanto en la UI como en la API."*

**Regla que define "completado" (REQ-C03):** *"Un curso solo se desbloquea cuando el estudiante ha
completado su prerequisito. Estar inscrito o en progreso no cuenta como completado."*

**Regla sobre cómo se muestra la lista de espera (REQ-C05):** *"Si el estudiante queda en lista de
espera, el badge debe mostrar 'Lista de espera' (no 'Inscrito')."* Aplica al caso 4: conviene mirar
**todo** el body de la respuesta, no solo el campo `status`.

**Mapa de prerequisitos documentado:**

```text
Fundamentos de Testing          ← sin prerequisito
  ↳ Playwright desde cero       ← requiere Fundamentos
  ↳ Diseño de casos de prueba   ← requiere Fundamentos
      ↳ API Testing             ← requiere Playwright desde cero
      ↳ CI/CD para QA           ← requiere Playwright desde cero
      ↳ Liderazgo QA            ← requiere Diseño de casos
```

---

## 2. POST /api/login

| | |
|---|---|
| Qué envía | `{ "email": "...", "password": "..." }` |
| Status esperado | `200` con credenciales válidas · `401` con credenciales inválidas · `400` si falta un campo |
| REQ que lo respalda | REQ-L01 (ambos campos obligatorios) · REQ-L02 (credenciales inválidas → error) |
| Qué devuelve | mensaje de éxito y los datos del usuario |
| Cómo mantiene la sesión | header `set-cookie` con `ash_session` |

**Reglas de negocio que le aplican:**

- **REQ-L01** — El login requiere email y contraseña. Ambos son obligatorios.
- **REQ-L02** — Las credenciales se validan contra los usuarios registrados. Un email no registrado o
  una contraseña incorrecta muestran un mensaje de error.
- **REQ-L03** — *Rate limiting*: después de 5 intentos fallidos consecutivos, la cuenta se bloquea por
  30 segundos.
- **REQ-L04** — Tras un login exitoso, el sistema muestra un mensaje de bienvenida con el nombre del
  usuario.

> **Cuidado en clase y en la tarea:** REQ-L03 es una regla del producto, no un error. Si te bloqueas,
> el sistema está funcionando como está escrito.

---

## 3. GET /api/courses

| | |
|---|---|
| Status esperado | `200` |
| REQ que lo respalda | REQ-C01 define el **contenido** del catálogo; el endpoint no está documentado aparte |
| Qué devuelve | `{"courses":[...],"total":N}` |
| Campos de cada curso | `id`, `title`, `description`, `level`, `duration`, `prerequisiteId`, `maxStudents`, `enrolled`, `icon` |
| ¿Necesita sesión? | **el documento no lo dice** |

**Regla asociada (REQ-C04):** *"Al inscribirse exitosamente, el número de cupos disponibles debe
reducirse en 1."*

---

## 3-bis. GET /api/students — agregado en C16

> **Esta sección la escribió QA, no el producto.** El endpoint no está documentado: apareció en
> Network mientras alguien usaba `/estudiantes`, siguiendo el procedimiento de la §8. Por eso todo
> lo de acá lleva fecha y se lee como **observación**, no como promesa.

| | |
|---|---|
| Ruta observada | `GET /api/students?page=1&pageSize=10` |
| Status observado | `200` — 2026-08-18 |
| Qué devuelve | `{"page":N,"pageSize":N,"total":N,"totalPages":N,"items":[{"id","name","cohort"}]}` |
| ¿Necesita sesión? | **no.** `/estudiantes` es una pantalla pública |
| REQ que lo respaldan | REQ-N01, REQ-N02 y REQ-N03 describen **la pantalla**, no el endpoint |

**Los tres requerimientos, textuales** (documentación · sección 8 · *Listado paginado de
estudiantes* · `/estudiantes`):

- **REQ-N01** — *"El listado muestra a los estudiantes paginados, 10 por página."*
- **REQ-N02** — *"El total de páginas es `ceil(total / pageSize)`. Con 25 estudiantes y 10 por página
  son 3 páginas; ningún estudiante debe quedar inalcanzable."*
- **REQ-N03** — *"Cada página muestra exactamente `pageSize` registros distintos. La página 1 empieza
  en el primer registro y ningún registro se repite entre páginas."*

> **Cuidado con lo que se puede concluir.** Los tres REQ hablan de la pantalla. Que la API y la
> pantalla coincidan hoy es una observación; que **deban** coincidir se apoya en que la pantalla se
> alimenta de este endpoint, y eso también es una observación. Cuando alguien pueda definirlo, se
> escribe acá y deja de ser observación.

---

## 4. Discrepancias observadas

> **Esta sección la escribes tú.** El resto de este archivo llegó escrito.
>
> Una discrepancia **no es un error tuyo**. Es un hallazgo: la spec dice una cosa y el producto hace
> otra. Se escriben **las dos versiones** y se cita el REQ. No se elige la que conviene, no se
> corrige el documento para que cierre, y no se decide quién tiene razón. Esa decisión no es de QA.
> **La detección sí.**

**Verificación:** ejecutada por `Adriana Troche` el `2026-08-18` con `curl y Playwright`.
Casos ejecutados: `5` de 5, más los tres de `GET /api/students`.

| # | Endpoint y dato | Lo que dice el contrato (REQ) | Lo que respondió el producto | Cómo lo verifiqué | Fecha |
|---|---|---|---|---|---|
| 1 | `POST /api/enroll` con `{"courseId":"playwright-cero"}` | `403` — REQ-A03 fila 5 · REQ-C06: *"la API debe aplicar las mismas reglas de validación que la UI"* | `200` — `{"status":"inscrito","spotsLeft":3}` | Playwright · con y sin cookie de sesión | 2026-08-18 |
| 2 | `POST /api/enroll` con `{"courseId":"api-testing"}` | REQ-C05: *"si el estudiante queda en lista de espera, el badge debe mostrar 'Lista de espera' (no 'Inscrito')"* | `status: "lista-espera"` correcto, pero **`displayStatus: "inscrito"`** | Playwright · el test de `status` pasa; la discrepancia está en otro campo | 2026-08-18 |
| 3 | `GET /api/students?page=1&pageSize=10` | REQ-N01: *"10 por página"* · REQ-N03: *"exactamente `pageSize` registros distintos"* | `items.length === 11` | Playwright · `toHaveLength(10)` → recibió 11 | 2026-08-18 |
| 4 | `GET /api/students?page=1&pageSize=10` | REQ-N02: *"el total de páginas es `ceil(total/pageSize)`… ningún estudiante debe quedar inalcanzable"* | `totalPages: 2` con `total: 25` y `pageSize: 10`. La UI dice **"página 1 de 2"**. `?page=3` sí devuelve los ids 21 a 25 | Playwright + navegador | 2026-08-18 |
| 5 | `GET /api/students` páginas 1 y 2 | REQ-N03: *"ningún registro se repite entre páginas"* | **`id: 11` (Karen Ávila)** aparece en las dos | curl a `?page=1` y `?page=2` | 2026-08-18 |
| 6 | `GET /api/courses` después de `POST /api/enroll` | REQ-C04: *"al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1"* | `enrolled` **no cambia** | curl antes y después de tres inscripciones | 2026-08-18 |
| 7 | `GET /api/auth/me` con la cookie que devolvió `POST /api/login` | REQ-S01 · la sesión debe reconocerse | `{"realUser":null}` | curl con `-c` y `-b` | 2026-08-18 |

> **Las filas 1 a 5 son las que produjo C16.** Las 6 y 7 vienen de C6 y siguen reproduciendo.
>
> Ninguna de estas filas se "arregló" cambiando el número esperado en el test. Las tres primeras
> tienen su test rojo conservado en el repositorio, clasificado como
> `DISCREPANCIA_CONTRATO_PRODUCTO`.

**Formato de una fila bien escrita** — es un ejemplo, no es tu hallazgo:

```text
POST /api/<endpoint> con <dato exacto>
  contrato : <status> — REQ-XXX, <frase textual del requerimiento>
  producto : <status> — <fragmento textual del body>
  verificado: curl, 2026-08-XX
```

Las cinco piezas que no pueden faltar: **endpoint exacto · dato exacto · respuesta exacta · fuente
citada con número · fecha.** Ninguna de las cinco es opinión.

---

## 5. Lo que el contrato no define — incógnitas

> También la escribes tú. Y **no es una falla**: es el mapa de los huecos del documento que te dieron.
> Un QA que dice *"esto no está definido"* está haciendo su trabajo.
>
> **Discrepancia** = la spec dice una cosa y el producto hace otra.
> **Incógnita** = la spec no dice nada y tú observaste algo.

Las que quedaron escritas hasta C16. **Ninguna tiene respuesta todavía**, y por eso ningún test se
apoya en ellas:

- **`POST /api/enroll` con un body JSON malformado devuelve `500`** (observado 2026-08-17). El
  documento no dice qué debería responder. Un cliente que manda basura debería recibir un `4xx`, no
  un `5xx`, pero **eso es una opinión mía, no una regla escrita**. `INCÓGNITA`.
- **`GET /api/enroll` devuelve `405`** (observado 2026-08-17). Es la respuesta correcta a un método
  no permitido, pero **la spec no lo documenta**. `INCÓGNITA`.
- **`GET /api/students` no está documentado como endpoint.** REQ-N01 a N03 describen la pantalla. Que
  la API y la pantalla deban coincidir es una conclusión razonable, no una promesa escrita.
  `INCÓGNITA` — y es la pregunta que más conviene llevar a quien pueda contestarla.
- **¿`/api/enroll` necesita sesión?** El documento no lo dice. Observado: responde igual con y sin
  cookie. `INCÓGNITA`.

Si te cuesta arrancar, estas preguntas suelen destapar algo:

- ¿El documento dice si `/api/enroll` necesita sesión?
- ¿Qué debería responder el endpoint ante un método que no acepta?
- ¿Qué debería responder si el body llega mal formado?
- ¿Qué prometen `/api/auth/me` y `/api/progress`, que existen y no están documentados?

---

## 6. Cómo interrogar este contrato con IA

Un contrato de tu trabajo puede tener sesenta páginas. Buscar a mano *"qué status debe devolver este
endpoint cuando falta un campo"* cuesta veinte minutos. La IA lo encuentra en diez segundos — **si le
pones un límite duro y verificas la cita.**

```text
Te pego un fragmento de la especificación de una API.
Respóndeme SOLO con lo que esté escrito en ese fragmento.

Pregunta: ¿qué debe responder <método> <ruta> cuando <caso>?

Reglas que no puedes romper:
- Si el fragmento no lo dice, responde exactamente: NO ESTÁ EN LA ESPECIFICACIÓN.
- No completes con lo que suele hacer una API parecida.
- Cita textualmente la línea del fragmento de donde sacaste la respuesta.
- No escribas tests ni código.

Especificación:
[PEGAR AQUÍ]
```

**El gate, y son dos pasos, no uno:**

1. **Ubica con tus ojos la línea que citó.** Si no la encuentras en el fragmento, la respuesta no
   existe, por bien redactada que esté.
2. **Recuerda qué te contestó y qué no.** Te contestó **qué promete el documento**. No te contestó si
   el producto cumple. Eso no lo sabe ninguna IA: no ejecutó nada.

---

## 7. Gate humano

- [ ] Leí el contrato antes de ejecutar: sé qué debía pasar en cada uno de los cinco casos.
- [ ] Ejecuté yo, hoy, y sé con qué comando o desde qué pantalla.
- [ ] Cada fila de la sección 4 tiene **las dos versiones** y el REQ que la respalda.
- [ ] No corregí ninguna línea de las secciones 0 a 3 para que la tabla cerrara.
- [ ] La sección 5 no está vacía.
- [ ] Ninguna afirmación mía sale de una IA sin que yo haya visto la línea citada.
- [ ] No hay tests escritos en este archivo. Eso es C15.

**La prueba de la reunión:** si alguien señala una fila de la sección 4 y pregunta *"¿por qué acá
dice 403?"*, la respuesta tiene que ser *"REQ-A03, cuarta línea, la abro ahora"*. No *"lo puso la
IA"*, no *"me parece"*.

---

## 8. Cuando no te dan contrato: explorar

Va a pasar, y más seguido de lo que te gustaría. No hay documentación, o la hay y quedó vieja. **No
te quedas sin trabajo: cambias de fuente.** El procedimiento es este, y es el mismo en cualquier
producto.

| Paso | Qué haces | Qué produce |
|---|---|---|
| 1 | Abre DevTools → Network → filtro Fetch/XHR y **usa la aplicación como un usuario** | la lista de endpoints que existen de verdad |
| 2 | Anota método, ruta y para qué sirve cada uno | la sección 0 escrita por observación |
| 3 | Ejecuta el camino feliz de cada endpoint y guarda status y body textuales | el comportamiento base |
| 4 | Repite cambiando **un** dato por vez: falta un campo, dato inexistente, método distinto, body roto | los bordes |
| 5 | Escribe cada resultado como **observación con fecha**, nunca como regla | un contrato observado |
| 6 | Lleva las preguntas que quedaron abiertas a quien pueda responderlas | las definiciones que faltan |

**La regla que no se puede saltear:** lo que observaste es una **muestra**, no una regla. Que hoy
haya devuelto `400` no significa que la regla sea `400`: significa que hoy devolvió `400`. Por eso
cada línea lleva fecha, y por eso lo que sale de acá se escribe como observación, no como promesa.

**Y el aporte más valioso de esta situación es el paso 6.** En un equipo sin documentación, tu lista
de preguntas abiertas suele ser el primer documento que alguien escribió sobre cómo funciona el
producto.

---

## 9. Adónde va este archivo

- **C7** lo lee para decidir qué vale la pena automatizar. Las filas de la sección 4 son candidatas
  fuertes: ya tienen endpoint, dato y resultado esperado.
- **C15** lo abre para escribir los tests de API: cada caso con fuente se convierte en un test.
- **C16** se lo entrega a `@api-agent`, que genera tests de API. El agente **no puede inventar
  endpoints**: la tabla de la §0 es su lista blanca, y solo conoce lo que está acá. Cuando le piden
  algo que no está —un `DELETE`, un status para el body malformado—, devuelve `ENTRADA_FALTANTE`.
- **C17** decide qué parte de todo esto merece entrar al pipeline. Las filas de la §4 son las que
  producen tests rojos por discrepancia, y hay que declarar qué se hace con ellos.
- **C18 a C20** lo abren para el proyecto final. La §4 es la primera página del reporte de bugs.
- Un caso que hoy no tiene fuente es un test que no vas a poder escribir. Y decirlo también es una
  respuesta profesional: *"no puedo verificar esto porque el contrato no lo define"*.
