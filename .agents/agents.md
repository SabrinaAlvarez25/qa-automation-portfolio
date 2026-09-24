# Registro de roles y capacidades — qa-automation-portfolio

> ## Este archivo llega dado. Hoy solo necesitas saber que existe.
>
> **Qué es:** el índice del repositorio para cualquier IA que trabaje acá adentro. Qué es este
> proyecto, dónde está la verdad y qué capacidades existen.
>
> **Por qué llega escrito:** hoy —en C7— el trabajo es la skill. Este archivo está acá para que la
> carpeta `.agents/` esté completa desde el primer día y para que la skill tenga dónde registrarse.
> **En C8 lo vas a entender entero y lo vas a hacer tuyo:** completar el contexto, comprobar que los
> archivos de la sección 2 existen de verdad en tu `docs/` y agregar lo que falte.
>
> **Este archivo no ejecuta nada.** Es un registro. Que exista una carpeta `.agents/` no convierte al
> repositorio en un agente.

---

## 1. Qué es este repositorio

| | |
|---|---|
| **Proyecto** | `qa-automation-portfolio` — el repositorio que crece durante toda la ruta |
| **Sistema bajo prueba** | Academia sin Humo · `https://playground.calidadsinhumo.com` |
| **Especificación** | `https://playground.calidadsinhumo.com/documentacion` |
| **Estado hoy** | documentación viva + una skill. Todavía **no hay tests**: el primero se escribe en C10 |
| **Responsable de las decisiones** | la QA dueña del repositorio. Ninguna capacidad de acá firma nada |

---

## 2. Dónde está la verdad

Ningún pedido vuelve a pegar este contenido en el chat. Se señala el archivo.

| Archivo | Qué contiene | Nació en |
|---|---|---|
| `docs/prompt-template.md` | la estructura base para pedirle algo a la IA | C1 |
| `docs/mapa-selectores.md` | los elementos del login localizados y comprobados en el DOM real | C3 · C4 |
| `docs/js-esencial.md` | lo mínimo de JavaScript para leer un test | C5 |
| `docs/contrato-api.md` | contrato dado + discrepancias observadas + incógnitas + la lista cruda de candidatos | C6 |
| `docs/estrategia-automatizacion.md` | el backlog priorizado y firmado: fuente, score, decisión y razón | C7 |
| `.agents/rules/criterio-qa.md` | las reglas estables, siempre activas | C7 (semilla) · C8 (cosechado) |

---

## 3. Capacidades registradas

### `priorizar-automatizacion` · skill

| | |
|---|---|
| **Dónde vive** | `.agents/skills/priorizar-automatizacion/SKILL.md` |
| **Qué hace** | puntúa candidatos a automatización contra cuatro criterios y devuelve la tabla con total y zona |
| **Qué NO hace** | no decide, no escribe la razón, no agrega candidatos, no inventa, no escribe tests |
| **Qué necesita de entrada** | una lista de candidatos **con fuente** + el contexto de equipo de `docs/estrategia-automatizacion.md` §1 + la escala de su §2 |
| **Dónde deja la salida** | en la conversación, para que la QA la pegue y la **firme** en `docs/estrategia-automatizacion.md` §3 |
| **Cuándo pide decisión humana** | siempre que un puntaje dependa de un dato que no está en el repositorio |
| **Nació en** | C7, empaquetando un procedimiento ejecutado a mano tres veces en la misma clase |


## ### `derivar-casos-de-hu` · skill

| | |
|---|---|
| **Dónde vive** | `.agents/skills/derivar-casos-de-hu/SKILL.md` |
| **Qué hace** | recorre una historia de usuario por capas: contexto,reglas, preguntas, riesgos y deriva casos de prueba ordenados por riesgo, cada uno con criterio, requerimiento y fragmento textual|
| **Qué NO hace** | no firma, no ejectua, no escribe tests y no modifica archivos. El procedimiento vive en la sección 3 y los límites en la sección 4 del SKILL.md|
| **Qué necesita de entrada** | una historia con criterios de aceptacion identificados; los requerimientos y las notas del equipo, si extisten. |
| **Dónde deja la salida** | en la conversación, la QA la revisa con los gates y la guarda en docs/casos-funcionalidad.md|
| **Cuándo pide decisión humana** | ver la seccion 5 del skill.md|
| **Nació en** | C8, empaquetando como se dirigio a la IA capa por capa sobre el login: los cinco pedidos son los pasos y los gates son limites|


### `revisar-con-rubrica` · skill

| | |
|---|---|
| **Dónde vive** | `.agents/skills/revisar-con-rubrica/SKILL.md` |
| **Qué hace** | revisa un artefacto de QA contra una rúbrica de cuatro dimensiones (trazabilidad, cobertura, claridad ejecutable, honestidad) y devuelve puntajes, hallazgos accionables citando la pieza por su número, y una lista «QUÉ FALTA» de 3 a 5 viñetas con el hueco y su fuente |
| **Qué NO hace** | no aprueba, no rechaza, no corrige el artefacto, no escribe las piezas que faltan, no inventa fuentes, no opina sobre el producto y no pone un puntaje sin hallazgo |
| **Qué necesita de entrada** | el artefacto a revisar (casos, test o documentación) completo y con piezas numeradas + las fuentes contra las que se revisa (`docs/`) + qué tipo de artefacto es. Opcionalmente `.agents/rules/criterio-qa.md` |
| **Dónde deja la salida** | en la conversación: cuatro bloques (puntajes, hallazgos, «QUÉ FALTA», lo que no pudo evaluar). Decidir qué se hace con cada hallazgo es trabajo de la QA |
| **Cuándo pide decisión humana** | cuando fuente y pantalla no coinciden, cuando el requisito admite más de una lectura, cuando el hueco depende de algo que el equipo tiene que preparar, cuando el artefacto contradice una decisión ya firmada, o cuando no queda claro si algo es caso faltante o decisión de alcance |
| **Nació en** | C9, tercera skill del repositorio: las dos primeras producen, esta revisa. La invoca el paso 2 del workflow `generar-y-juzgar` |


### `generar-y-juzgar` · workflow

| | |
|---|---|
| **Dónde vive** | `.agents/workflows/generar-y-juzgar.md` |
| **Qué hace** | corre cinco pasos fijos sobre un archivo de casos ya generado: prepara lo que ve el juez (solo historia + preguntas + casos), juzga con `revisar-con-rubrica`, deja la revisión escrita en `docs/revision-<funcionalidad>.md`, pide las decisiones de la QA y registra las decisiones y los casos nuevos aprobados |
| **Qué NO hace** | no genera casos (eso lo hace `derivar-casos-de-hu`), no aprueba, no decide (el paso 4 es humano), no escribe casos sin permiso de la QA y no prueba el producto |
| **Qué necesita de entrada** | el archivo de casos a juzgar (por ejemplo `docs/casos-login-v2.md`), que debe tener un encabezado con la historia fuente |
| **Dónde deja la salida** | crea `docs/revision-<funcionalidad>.md` con puntajes, hallazgos, «QUÉ FALTA» y una tabla de decisiones; cada fila empieza en `PENDIENTE` hasta que la QA la firma |
| **Cuándo pide decisión humana** | en el paso 4: la QA dice `ACEPTO Y CORRIJO`, `ACEPTO Y NO CORRIJO HOY` o `RECHAZO` con su razón por cada hallazgo y cada viñeta de «QUÉ FALTA». Se espera al menos un `RECHAZO` |
| **Nació en** | C9, primer workflow del repositorio. Usa `revisar-con-rubrica`. Desde C10 se usa igual cambiando el artefacto a test de Playwright |

---

## 4. Cómo crece este archivo

Se agregan filas; no se borran las anteriores. Lo previsto en la ruta:

| Clase | Qué se registra |
|---|---|
| C8 | la segunda skill del repositorio, empaquetada en autonomía |
| C9 | el workflow `generar-y-juzgar` y la skill `revisar-con-rubrica` |
| C11 | la skill `diagnosticar-fallo-playwright` |
| C14 | el agente `pom-agent` |
| C16 | el agente `api-agent` |
| C17 | la capacidad que produce el workflow de integración continua |

Una capacidad entra al registro solo si **se va a usar en tres o más momentos o en el trabajo
cotidiano**. Si se usa una vez, fue un pedido puntual y no necesita archivo.

---

## 5. Lo que este registro no cubre

- **No hay agentes todavía.** Un agente es un modelo con herramientas, un ciclo de trabajo y una
  condición de parada. Lo que hay hoy son reglas y una skill: instrucciones, no autonomía.
- **No hay subagentes.** Se usan cuando el trabajo es divisible de verdad o cuando hacen falta
  miradas independientes que después alguien reconcilia. Todavía no es el caso.
- **El criterio no está acá.** Se puede escribir el procedimiento; no se puede escribir la firma.

---

*Semilla entregada en C7 · se completa en C8 · qa-automation-portfolio · Ruta QA Automation con IA*
