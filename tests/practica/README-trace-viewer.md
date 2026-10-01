# Práctica individual — Trace Viewer

## Objetivo

Practicar el diagnóstico de un fallo de automatización utilizando Playwright y Trace Viewer, mediante una prueba E2E independiente de los ejercicios del curso.

## Test realizado

Archivo:

`practica-trace-viewer.spec.ts`

El test navega a la pantalla de login de Academia sin Humo y localiza el botón:

`getByRole('button', { name: 'Iniciar sesión' })`

## Fallo intencional

Se mantuvo el locator correcto y se modificó intencionalmente la expectativa:

`toHaveText('Entrar')`

El test falló porque el botón tenía como texto real:

`Iniciar sesión`

Playwright mostró el valor esperado y el valor recibido.

## Análisis con Trace Viewer

Se utilizó el `trace.zip` generado por Playwright para analizar la ejecución y comprobar el locator, la expectativa y los valores involucrados en el fallo.

Se guardó una captura como evidencia en:

`tests/practica/evidencia/trace-viewer-fallo.png`

## Corrección

Se corrigió la expectativa utilizando el texto real del botón:

`toHaveText('Iniciar sesión')`

El test volvió a ejecutarse correctamente:

`1 passed`

## Registro en Git

La práctica quedó registrada en dos commits:

* `6993df0` — `test: practicar diagnostico con Trace Viewer`
* `826e187` — `fix: corregir expectativa de texto en practica Trace Viewer`

Esta práctica es independiente de los tests desarrollados como parte del curso.
