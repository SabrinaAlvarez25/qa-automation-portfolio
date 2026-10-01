# Práctica individual — Playwright Trace Viewer

## Objetivo

Crear una prueba E2E independiente de los ejercicios del curso para practicar la ejecución de tests con Playwright y el análisis de fallos mediante Trace Viewer.

## Test realizado

Archivo:

`practica-trace-viewer.spec.ts`

El test navega a la pantalla de login de Academia sin Humo y comprueba que el botón **"Iniciar sesión"** sea visible.

## Ejecución normal

El test se ejecutó con:

```bash
npx playwright test tests/practica/practica-trace-viewer.spec.ts
```

Resultado:

`1 passed`

## Ejecución con Trace

Se ejecutó nuevamente utilizando:

```bash
npx playwright test tests/practica/practica-trace-viewer.spec.ts --trace on
```

El trace permite registrar información detallada de la ejecución para analizar posteriormente el comportamiento del test.

## Fallo intencional

Para practicar el diagnóstico se modificó temporalmente el locator para buscar un botón que no existía:

`getByRole('button', { name: 'Boton que no existe' })`

El test falló porque el elemento no fue encontrado.

Playwright proporcionó:

* mensaje de error;
* locator utilizado;
* línea del test donde ocurrió el fallo;
* screenshot;
* `error-context.md`;
* archivo `trace.zip`.

## Análisis con Trace Viewer

El trace se abrió mediante:

```bash
npx playwright show-trace "ruta-al-trace.zip"
```

En Trace Viewer se observó la ejecución del test y la acción:

`expect.toBeVisible`

junto con el locator:

`getByRole('button', { name: 'Boton que no existe' })`

Esto permitió identificar qué esperaba el test y qué elemento no pudo encontrar.

## Restauración

Después del ejercicio, el locator se restauró al botón real:

`getByRole('button', { name: 'Iniciar sesión' })`

El test volvió a ejecutarse correctamente:

`1 passed`

## Aprendizaje

La práctica permitió comprobar que Trace Viewer puede utilizarse como evidencia para investigar un fallo de automatización, mostrando las acciones realizadas durante la ejecución y el contexto asociado al error.

Esta práctica es independiente de los tests desarrollados como parte del curso.
