# Evidencia S9 — Corrida de priorizar-automatizacion

## Corrida

* **Fecha:** 23/09/2026
* **Skill:** `.agents/skills/priorizar-automatizacion/SKILL.md`
* **Entrada:** `docs/casos-login.md`
* **Casos analizados:** 8
* **Resultado:** tabla de priorización propuesta por la skill.

## Qué observó la corrida

La skill identificó los 8 casos de login y propuso puntajes para Frecuencia y Riesgo.

* Frecuencia propuesta: 3 para los 8 casos.
* Riesgo: 3 para los casos 1 a 5, 2 para el caso 6 y 1 para los casos 7 y 8.
* Estabilidad: `SIN CONTEXTO`.
* Mantenimiento: `SIN CONTEXTO`.
* Por falta de esos datos no se calcularon Total ni Zona.

## Revisión humana

La salida fue revisada antes de incorporarla a `docs/estrategia-automatizacion.md`.

Se decidió:

* Casos 1 a 6: `AUTOMATIZAR DESPUÉS DE` confirmar el contexto necesario.
* Casos 7 y 8: `PROBAR A MANO` por ahora, debido a su bajo riesgo y simplicidad.
* Esta decisión puede cambiar si el equipo aporta información sobre frecuencia, estabilidad, datos de prueba o mantenimiento.

## Evidencia de límite de la skill

La corrida mostró que no corresponde cerrar una prioridad definitiva cuando faltan datos de estabilidad y mantenimiento. Por eso esos campos quedaron como `SIN CONTEXTO` y no se inventaron Total ni Zona.

## Archivos afectados

* `docs/estrategia-automatizacion.md`
* `evidence/s9-corrida-priorizar-automatizacion.md`
