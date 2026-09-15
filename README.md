# QA Automation Portfolio

Proyecto acumulativo de la Ruta QA Automation con IA.

## Qué demuestra hoy

- Puedo instalar, configurar y ejecutar un proyecto Playwright.
- Puedo separar preparación de asincronía con mapas de lectura y gates humanos.
- Puedo leer la evidencia empírica de un fallo antes de corregirlo (`Timeout`, `Received`, `Expected`).
- Puedo estructurar predicciones y auditorías para la capa de red HTTP (`request`, `response`, `status`, `header`).
- Puedo restaurar el verde (`2 passed`) y guardar trazabilidad limpia con Git.

## Comandos

```bash
npm install
npx playwright install chromium
npm test
```

## Recursos de trabajo

- `docs/prompt-template.md`: estructura para dirigir una solicitud a la IA.
- `docs/flujo-ia-diagnostico-fallos.md`: flujo para analizar un fallo, validar la propuesta y autorizar solamente un cambio mínimo.

## Historia del proyecto

| Sesión | Aporte | Evidencia |
|---|---|---|
| S1 | Criterio para validar salidas de IA | `evidence/s1-validacion-ia.md` |
| S2 | Primer ciclo reproducible y Git | `tests/primer-ciclo.spec.ts` + historial Git |
| S4 | Lectura en orden, control asíncrono y glosario de errores |docs/js-esencial.md + tests/orden-ejecucion.spec.ts
| S6 | Mapeo conceptual y auditoría de Request/Response HTTP | docs/js-esencial.md 


