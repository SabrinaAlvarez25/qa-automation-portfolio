# Lo que C16 agrega a `docs/contrato-api.md` — solo se agrega

> **Este archivo no se copia encima de nada.** Las secciones 0 a 3 de tu contrato llegaron dadas en
> C6; **las 4 y 5 las escribiste tú**, con tus fechas, y en C15 les agregaste las observaciones de
> `/api/enroll`. Lo de hoy son **cuatro bloques que se agregan**, y no se cambia ni se borra ninguna
> línea.
>
> Los agrega el agente con un pedido de una línea. Si no responde, se pegan a mano.
>
> **Si no tienes contrato** —porque faltaste a C6— necesitas el archivo entero: está en
> `recursos-s16/contrato-api.SEMILLA.md`, con otro nombre para que ninguna copia lo confunda con el
> tuyo. Ver el último apartado.

## El pedido

```text
Agrega a docs/contrato-api.md los cuatro bloques de recursos-s16/entrada-para-contrato-api.md, cada uno en el lugar que dice y tal cual. En las filas de la sección 4, deja la fecha vacía para que la complete yo. No cambies ni borres ninguna línea. Muéstrame el diff y detente.
```

Después: `git diff --stat -- docs/contrato-api.md` tiene que terminar en `insertions(+)`, **sin**
`deletions(-)`. Y las fechas de la §4 las pones **tú**, con el día en que lo viste.

---

## Bloque 1 — una fila en la §0, «Superficie declarada de la API»

Va **al final de la tabla**, debajo de `/api/progress`.

```markdown
| GET | `/api/students` | **observación en Network** — 2026-08-18. REQ-N01 a N03 describen la pantalla `/estudiantes`, no el endpoint | listado paginado de estudiantes; acepta `?page=` y `?pageSize=` |
```

> **Por qué esta fila es la más importante de los cuatro bloques.** Es la que habilita al agente. Si esta ruta
> no estuviera acá, `@api-agent` no podría escribir un solo test contra ella — y estaría bien que no
> pudiera. Primero una persona la ejecutó y la documentó con fecha; recién entonces existe.

---

## Bloque 2 — una sección nueva, entre la §3 y la §4

```markdown
## 3-bis. GET /api/students — agregado en C16

> **Esta sección la escribió QA, no el producto.** El endpoint no está documentado: apareció en
> Network mientras alguien usaba `/estudiantes`, siguiendo el procedimiento de la §8. Por eso todo
> lo de acá lleva fecha y se lee como **observación**, no como promesa.

| | |
|---|---|
| Ruta observada | `GET /api/students?page=1&pageSize=10` |
| Status observado | `200` — 2026-08-18 y 2026-10-02 |
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
```

---

## Bloque 3 — tres filas en la §4, «Discrepancias observadas»

**Se agregan a tu tabla, debajo de las que ya tengas.** No la reemplaces: las tuyas valen igual que
estas, y llevan tu nombre.

```markdown
| | `GET /api/students?page=1&pageSize=10` | REQ-N01: *"10 por página"* · REQ-N03: *"exactamente `pageSize` registros distintos"* | `items.length === 11` | Playwright · `toHaveLength(10)` → recibió 11 |  |
| | `GET /api/students?page=1&pageSize=10` | REQ-N02: *"el total de páginas es `ceil(total/pageSize)`… ningún estudiante debe quedar inalcanzable"* | `totalPages: 2` con `total: 25` y `pageSize: 10`. La UI dice **"página 1 de 2"**. `?page=3` sí devuelve los ids 21 a 25 | Playwright + navegador |  |
| | `GET /api/students` páginas 1 y 2 | REQ-N03: *"ningún registro se repite entre páginas"* | **`id: 11` (Karen Ávila)** aparece en las dos | curl a `?page=1` y `?page=2` |  |
```

> **Pon tu fecha, no la mía.** La fecha dice cuándo lo viste **tú**. Si copias la mía, la fila deja de
> ser tuya y no la puedes defender en una reunión.

---

## Bloque 4 — una línea en la §5, «Lo que el contrato no define»

Al final de tu lista de la §5, debajo de las observaciones de C15.

```markdown
- **`GET /api/students` no está documentado como endpoint.** REQ-N01 a N03 describen la pantalla. Que
  la API y la pantalla deban coincidir es una conclusión razonable, no una promesa escrita.
  `INCÓGNITA` — y es la pregunta que más conviene llevar a quien pueda contestarla.
```

> Las observaciones de `/api/enroll` (sin sesión, `409`, `500` sin cuerpo, `405`) **ya las agregaste
> en C15**. Por eso no vuelven acá.

---

## Lo que NO se toca

| Sección | Por qué |
|---|---|
| §0 a §3 | son lo que **el producto prometió**. Si escribes tu suposición ahí arriba, dentro de un mes nadie va a poder distinguir qué prometió el equipo y qué supusiste tú |
| Tus filas de la §4 y la §5 | son tuyas, con tu fecha. Las de acá **se suman a las tuyas** |
| §6 a §9 | son el procedimiento y no cambian |

---

## Si no tienes contrato porque faltaste a C6

Entonces sí necesitas el archivo entero:

```bash
cp recursos-s16/contrato-api.SEMILLA.md docs/contrato-api.md
```

Ese archivo trae los cuatro bloques **ya aplicados**, más las discrepancias de C6 que se
reverificaron el 2026-08-18. Está a propósito con **otro nombre y fuera de una carpeta `docs/`**,
para que ninguna copia de este paquete pueda pisarte el tuyo por accidente.

Y una advertencia: si lo copias, las filas de la §4 llevan **mi** verificación, no la tuya. Vuelve a
ejecutar al menos dos de los comandos y cambia la fecha y el nombre. Una fila que no ejecutaste no la
puedes defender.
