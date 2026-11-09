# Lo que C16 agrega a `.agents/agents.md` — solo se agrega

> **Este archivo no se copia encima de nada.** Tu `agents.md` es tuyo desde C7: lo completaste en C8,
> C8, C9 y C11 le agregaron una skill cada una, y en C14 llegó `@pom-agent`. Lo de hoy son **dos
> bloques que se agregan**, y no se cambia ni se borra ninguna línea.
>
> En clase los agrega el agente del IDE con un pedido de una línea, como en C9, C11 y C14. Si el
> agente no responde, se pegan a mano: son los dos bloques de abajo, tal cual.

## El pedido

```text
Agrega a .agents/agents.md los dos bloques de recursos-s16/entrada-para-agents-md.md, cada uno en el lugar que dice y tal cual. No cambies ni borres ninguna línea. Muéstrame el diff y detente.
```

---

## Bloque 1 — al final de la sección 3, «Capacidades registradas»

Debajo de la última que tengas (`reportar-bug`, de C15, o `@pom-agent`, de C14).

```markdown
### `generar-tests-api` · skill

| | |
|---|---|
| **Dónde vive** | `.agents/skills/generar-tests-api/SKILL.md` |
| **Qué hace** | convierte filas de `docs/contrato-api.md` en tests de API con su REQ citado, los ejecuta y clasifica cada fallo |
| **Qué NO hace** | no inventa rutas, status ni campos; no corrige un fallo que no sea del test; no marca `test.fail()`; no toca el contrato |
| **Nació en** | C16. La octava skill del repositorio |

### `@api-agent` · agente

| | |
|---|---|
| **Dónde vive** | `.agents/workflows/api-agent.md`, que se invoca como `/api-agent` |
| **Qué hace** | usa `generar-tests-api`: propone un plan trazable, espera `PLAN APROBADO`, escribe, ejecuta, clasifica y decide si para, corrige o escala, hasta 3 intentos |
| **Qué entrega** | `CANDIDATO`, `CANDIDATO CON HALLAZGOS` o `ESCALADO`. Nunca `ACEPTADO` |
| **Nació en** | C16. El segundo agente del repositorio |
```

## Bloque 2 — en la sección 5, debajo de la viñeta que agregaste en C14

Debajo de *«Desde C14 hay un agente, y uno solo…»*. Esa no se borra.

```markdown
- **Desde C16 son dos:** `@pom-agent` y `@api-agent`. Los dos entregan candidatos; la aceptación
  sigue siendo de la QA.
```

---

## Cómo comprobar que quedó bien

```bash
git diff --stat -- .agents/agents.md
```

Tiene que terminar en `insertions(+)`, **sin** `deletions(-)`. Si aparece una línea borrada,
`git checkout -- .agents/agents.md` y pegas los dos bloques a mano.
