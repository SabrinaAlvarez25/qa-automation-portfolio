# S8 — Validación de `derivar-casos-de-hu`

## Objetivo

Validar la Skill `derivar-casos-de-hu` utilizando una historia de usuario diferente a la utilizada para definir la Skill.

## Entrada

* Historia de usuario: `docs/HU-REGISTRO.md`
* Skill: `.agents/skills/derivar-casos-de-hu/SKILL.md`
* Reglas QA: `.agents/rules/criterio-qa.md`

## Ejercicio realizado

La historia `HU-REG-01 — Registro de estudiante` fue procesada por capas:

1. **Contexto** — objetivo, usuario, camino feliz, entradas y salida.
2. **Reglas** — derivación de reglas verificables a partir de los criterios de aceptación.
3. **Preguntas** — identificación de ambigüedades y datos que requieren confirmación.
4. **Riesgos** — identificación de riesgos sin asignar impacto cuando faltaba contexto del equipo.
5. **Casos de prueba** — derivación de casos utilizando partición de equivalencia y análisis de valores límite.

## Resultado

Se obtuvieron **22 casos de prueba**, con trazabilidad hacia los criterios de aceptación y requerimientos de la historia.

La validación comprobó que la Skill:

* trabaja por capas;
* mantiene trazabilidad entre criterio, requerimiento y texto fuente;
* identifica ambigüedades como `POR CONFIRMAR`;
* no inventa mensajes de error no definidos;
* contempla valores límite;
* separa la propuesta de casos de la decisión humana;
* no escribe tests ni ejecuta automatizaciones.

## Artefactos generados

* `docs/HU-REGISTRO.md`
* `docs/casos-funcionalidad.md`

## Estado

**Validación S8 realizada.**

Los casos quedan sujetos a revisión de QA antes de utilizarse como base para automatización.
