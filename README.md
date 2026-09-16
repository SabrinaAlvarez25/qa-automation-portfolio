[README (1).md](https://github.com/user-attachments/files/32303902/README.1.md)
# QA Automation Portfolio

![Playwright Tests](https://github.com/SabrinaAlvarez25/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)

Suite de tests end-to-end con **Playwright + TypeScript**, con integración continua en GitHub Actions.

## Qué demuestra este proyecto

- Diseño y automatización de tests E2E con Playwright, usando el patrón **Page Object Model**.
- Diagnóstico de fallos a partir de evidencia empírica (`Timeout`, `Received`, `Expected`) antes de aplicar una corrección.
- Validación de la capa de red HTTP: estructura y auditoría de `request`, `response`, `status` y `headers`.
- Manejo de asincronía y control del orden de ejecución en flujos de test.
- Trazabilidad limpia del trabajo con Git y CI automatizado en cada push.

## Stack

- **Automation:** Playwright, TypeScript
- **CI/CD:** GitHub Actions
- **Prácticas:** Page Object Model, control de versiones, diagnóstico de fallos basado en evidencia

## Cómo correrlo

```
npm install
npx playwright install chromium
npm test
```

## Estructura del repo

- `tests/` — casos de prueba automatizados
- `pages/` — Page Objects
- `docs/` — documentación de proceso y flujos de trabajo
- `evidence/` — registros de validación por sesión de trabajo

## Historial de avances

| Etapa | Qué se sumó | Detalle |
| ----- | ----------- | ------- |
| 1 | Primer ciclo de test reproducible | `tests/primer-ciclo.spec.ts` |
| 2 | Control de asincronía y orden de ejecución | `tests/orden-ejecucion.spec.ts` |
| 3 | Auditoría de capa HTTP (request/response) | `docs/js-esencial.md` |
| 4 | CI con GitHub Actions | `.github/workflows/playwright.yml` |

## Cómo trabajo

Uso herramientas de IA como apoyo para acelerar el diagnóstico y la escritura de tests, pero cada salida se valida manualmente antes de aplicarse — ver `docs/flujo-ia-diagnostico-fallos.md` para el criterio de validación que sigo.
