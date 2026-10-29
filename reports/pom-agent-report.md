# Reporte del Agente POM

## 1. Resultado
`VERIFICACIÓN SUPERADA` (12/12 en rúbrica y exit code 0).

## 2. Datos
- **Intento:** 3 de 3
- **POM:** `pages/registro.page.ts`
- **TEST:** `tests/e2e/registro.spec.ts`
- **EVIDENCIA_HTML:** `evidence/registro-form.html`
- **MAPA:** `docs/mapa-selectores.md`
- **URL:** `/registro`
- **REFERENCIA:** `pages/login.page.ts`

## 3. Rúbrica
| Criterio | Puntaje | Detalle / Líneas citadas |
|---|---|---|
| Locators | 3/3 | Todos semánticos (`getByLabel`, `getByRole`); todos con origen en HTML y trazabilidad al mapa o declarado como `SIN FILA`. |
| Aserciones fuera | 3/3 | Cero `expect`, ningún método `verificarX`, todos los locators expuestos como propiedades `readonly`. |
| Estructura | 3/3 | Molde completo: `readonly page: Page` (L13), locators `readonly` (L14-18) inicializados en constructor (L20-27), clase única para la página. |
| Acciones | 3/3 | `goto()` independiente con ruta relativa `'/registro'` (L29-31), método `registrarse` con parámetros (L33-41) sin navegación interna. |
| **Total** | **12/12** | **Superada** |

## 4. Origen de los locators
| Propiedad | Locator | Línea HTML | Fila del mapa |
|---|---|---|---|
| `nombre` | `page.getByLabel('Nombre completo')` | Línea 7 | `SIN FILA` |
| `email` | `page.getByLabel('Email')` | Línea 13 | Fila Campo email |
| `contrasena` | `page.getByLabel('Contraseña')` | Línea 19 | Fila Campo contraseña |
| `edad` | `page.getByLabel('Edad')` | Línea 25 | `SIN FILA` |
| `botonCrearCuenta` | `page.getByRole('button', { name: 'Crear cuenta' })` | Líneas 30-32 | `SIN FILA` |

## 5. Evidencia ejecutable
- **Comando:** `npx playwright test tests/e2e/registro.spec.ts`
- **Exit code:** `0`
- **Pasados:** `2`
- **Fallidos:** `0`
- **Duración:** `6.9s`
- **Salida del runner:**
```text
Running 2 tests using 1 worker

  ok 1 tests\e2e\registro.spec.ts:11:5 › línea base: los tres campos del page object a mano (4.0s)
  ok 2 tests\e2e\registro.spec.ts:19:5 › completo: los cinco controles del registro (679ms)

  2 passed (6.9s)
```
- **Control que no opina:**
`git grep -n "new RegistroPage(page)" tests/e2e/registro.spec.ts tests/fixtures.ts`
```text
tests/fixtures.ts:12:        const registroPage = new RegistroPage(page);
```
*(Exactamente una línea, en la fixture `tests/fixtures.ts`)*.

## 6. Cambios por intento
- **Intento 1:** Escalado por causa `ENTORNO` (el test estaba guardado como `tests/e2e/registro-spec.ts` y no como `tests/e2e/registro.spec.ts`).
- **Intento 2:** Escalado por causa `ENTORNO` (en `tests/fixtures.ts` faltaba declarar la fixture `registroPage`).
- **Intento 3:** Con el nombre corregido por la QA y la fixture agregada por la QA en `tests/fixtures.ts`, se ejecutó la verificación contra `pages/registro.page.ts`. El POM expone los 5 controles requeridos por el test (`nombre`, `email`, `contrasena`, `edad`, `botonCrearCuenta`), no se modificó ningún archivo de test ni de fixture por parte del agente.

## 7. Alcance
- **Qué no demuestra este verde:**
  - No demuestra que el formulario registre exitosamente un usuario en el backend (`tests/e2e/registro.spec.ts` solo comprueba la presencia y visibilidad de los 5 controles).
  - No valida las reglas de negocio ni validaciones de campos (edad mínima/máxima, email duplicado, formato de contraseña, etc.).
  - No demuestra la estabilidad a largo plazo de los locators marcados como `SIN FILA` en el DOM hasta que la QA los evalúe y confirme en el gate de su mapa de selectores.

## 8. Estado
- **Estado:** `CANDIDATO`
- **Decisión humana:** `PENDIENTE` (la palabra `ACEPTADO` no la firma el agente, la firma la QA).
