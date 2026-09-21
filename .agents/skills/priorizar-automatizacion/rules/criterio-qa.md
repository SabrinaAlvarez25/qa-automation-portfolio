# Criterio QA — reglas estables de este repositorio

> ## Este archivo llega dado, y llega a medio hacer. A propósito.
>
> **Qué es:** las reglas que ya venías repitiendo en cada pedido, escritas **una sola vez**. No se
> invocan: están siempre activas. Cualquier capacidad de este repositorio —la skill de hoy y las que
> vengan— trabaja debajo de estas reglas.
>
> **Por qué está incompleto:** acá abajo hay **cuatro** reglas, y son las cuatro que la skill de hoy
> necesita para funcionar. Entre C1 y C7 apareció bastante más que eso: cómo se pide un diagnóstico,
> qué locators se usan, cómo se explica código, qué se hace con una discrepancia. **Eso se cosecha en
> C8**, que es la clase donde este repositorio se convierte en un sistema de trabajo completo.
>
> **Qué NO va en este archivo:** el contexto del producto (eso vive en `docs/`) y los procedimientos
> con pasos (eso vive en `.agents/skills/`).

---

## 1. Honestidad sobre la fuente

Estas tres reglas son la misma idea con tres nombres, uno por artefacto. La idea es: **cuando falta
un dato, se escribe que falta.**

| Regla | Cuándo aplica | Nació en |
|---|---|---|
| Si un dato no está en lo que te entregué, escribe `SIN FUENTE` en esa celda y sigue. No lo completes con lo probable. | cualquier tabla o documento | C1 · C6 |
| Si un puntaje depende de información que no te di, escribe `SIN CONTEXTO` y di en una línea qué dato necesitas. No lo adivines. | priorización | C7 |
| **No inventes** endpoints, pantallas, requerimientos, campos ni comportamientos. La superficie real del sistema bajo prueba está en `docs/contrato-api.md` y en `docs/mapa-selectores.md`. Si algo no está ahí, no existe hasta que alguien lo verifique. | siempre | C6 · C7 |

---

## 2. Quién decide

| Regla | Nació en |
|---|---|
| No completes las columnas «decisión» ni «razón» de ningún documento. **Esas dos las firmo yo.** | C7 |

---

## 3. Cómo crece este archivo

Una regla entra acá cuando cumple las tres condiciones:

1. **Ya la escribiste al menos dos veces** en pedidos distintos.
2. **Vale para más de un artefacto.** Si solo aplica a un procedimiento, va dentro de esa skill, no acá.
3. **No es contexto del producto.** *"El curso `api-testing` no tiene cupo"* no es una regla: es un
   dato, y los datos viven en `docs/`.

Si una regla deja de cumplirse en la práctica, se borra. Un archivo de reglas que nadie respeta
enseña justo lo contrario de lo que dice.

---

## 4. Para cosechar en C8

> **Esta sección la llenas tú, en la tarea, y la vas a usar el miércoles.** Escribe crudo: no
> ordenes, no clasifiques y no decidas si cada línea es una regla, un dato o un procedimiento. Eso es
> exactamente el trabajo de C8, y hacerlo antes te lo arruina.

### Reglas mías que deberían estar siempre encendidas

* No inventar información que no está en la documentación o en lo que le entregué a la IA; si falta un dato, indicarlo como faltante.
* No tomar como válida una propuesta de la IA solamente porque parece correcta: comprobarla con la fuente, el sistema o la ejecución.
* Si hay una discrepancia entre lo documentado y lo que devuelve el sistema, señalarla y verificarla antes de asumir cuál de las dos es correcta.
* Cuando trabajamos con código o selectores, explicar qué hace la propuesta y comprobar que realmente funciona antes de darla por válida.

### Cosas que hice más de una vez y que todavía no son skill

* Darle a la IA un problema de QA y después comprobar la respuesta con evidencia del proyecto o del sistema.
* Probar locators de Playwright en la aplicación y verificar que encuentran el elemento esperado.
* Ejecutar una prueba de Playwright, revisar el resultado y corregir el problema a partir de la evidencia de la ejecución.
* Revisar documentación o un contrato de API y contrastarlo con el comportamiento real mediante una ejecución.
* Usar una propuesta de la IA como punto de partida y modificarla después de verificarla.

---

*Semilla entregada en C7 con cuatro reglas · se cosecha entero en C8.*


-
-

---

*Semilla entregada en C7 con cuatro reglas · se cosecha entero en C8.*
