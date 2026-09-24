# Casos de Prueba — Login

## Historia

**HU-LOG-01 — Inicio de sesión**

**Fuente:** `docs/HU-login.md`

## Preguntas abiertas

### P1 — Nombre del usuario
¿Cuál es el nombre exacto que debe aparecer en el mensaje de bienvenida después de un login exitoso?

### P2 — Mensaje de error
¿Cuál es el texto exacto que debe mostrarse cuando se utiliza un email no registrado o una contraseña incorrecta?

### P3 — Campos obligatorios
¿Qué comportamiento concreto debe ocurrir cuando el email o la contraseña están vacíos?

## Casos





| # | Caso                                   | Datos                                                                                                                | Resultado esperado                                                                                                                   | Fuente                                                                                                                                                                                                       | Técnica                                         | Riesgo |
| - | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ------ |
| 1 | Login exitoso con credenciales válidas | Email: `ana.garcia@ejemplo.com`<br>Contraseña: `Segura2026!`                                                         | Se inicia sesión y se muestra un mensaje de bienvenida con el nombre del usuario. Nombre exacto: **POR CONFIRMAR (P1)**              | CA4 · REQ-L04 · `"Tras un login exitoso, el sistema muestra un mensaje de bienvenida con el nombre del usuario."`                                                                                            | Partición de equivalencia — datos válidos       | Alto   |
| 2 | Login con contraseña incorrecta        | Email registrado: `ana.garcia@ejemplo.com`<br>Contraseña incorrecta                                                  | No se inicia sesión y se muestra un mensaje de error. Texto exacto: **POR CONFIRMAR (P2)**                                           | CA2 · REQ-L02 · `"Un email no registrado o una contraseña incorrecta muestran un mensaje de error."`                                                                                                         | Partición de equivalencia — contraseña inválida | Alto   |
| 3 | Login con email no registrado          | Email: `noexiste@ejemplo.com`<br>Contraseña: `Segura2026!`                                                           | No se inicia sesión y se muestra un mensaje de error. Texto exacto: **POR CONFIRMAR (P2)**                                           | CA2 · REQ-L02 · `"Un email no registrado o una contraseña incorrecta muestran un mensaje de error."`                                                                                                         | Partición de equivalencia — email no registrado | Alto   |
| 4 | Quinto intento fallido consecutivo     | Email: `ana.garcia@ejemplo.com`<br>Contraseña incorrecta<br>Repetir hasta completar 5 intentos fallidos consecutivos | La cuenta se bloquea por 30 segundos, el botón de login queda deshabilitado y se muestra un timer visual con los segundos restantes. | CA3 · REQ-L03 · `"después de 5 intentos fallidos consecutivos, la cuenta se bloquea por 30 segundos."` / `"el botón de login debe estar deshabilitado"` / `"un timer visual muestra los segundos restantes"` | Valor límite — 5 intentos                       | Alto   |
| 5 | Cuarto intento fallido consecutivo     | Email: `ana.garcia@ejemplo.com`<br>Contraseña incorrecta<br>4 intentos fallidos consecutivos                         | No se alcanza todavía el límite de 5 intentos fallidos consecutivos. No se considera iniciado el bloqueo de 30 segundos.             | CA3 · REQ-L03 · `"después de 5 intentos fallidos consecutivos, la cuenta se bloquea por 30 segundos."`                                                                                                       | Valor límite — 5−1                              | Alto   |
| 6 | Fin del período de bloqueo             | Realizar el bloqueo y observar el timer hasta llegar a 0                                                             | Mientras el bloqueo está activo, el botón permanece deshabilitado. El botón se habilita exactamente cuando el timer llega a 0.       | CA3 · REQ-L03 · `"Durante el bloqueo: el botón de login debe estar deshabilitado; un timer visual muestra los segundos restantes; el botón se habilita exactamente cuando el timer llega a 0."`              | Valor límite — 0 segundos                       | Medio  |
| 7 | Email vacío                            | Email vacío<br>Contraseña válida                                                                                     | No se inicia sesión. El comportamiento concreto al enviar el formulario: **POR CONFIRMAR (P3)**                                      | CA1 · REQ-L01 · `"El login requiere email y contraseña. Ambos son obligatorios."`                                                                                                                            | Partición de equivalencia — email vacío         | Bajo   |
| 8 | Contraseña vacía                       | Email válido<br>Contraseña vacía                                                                                     | No se inicia sesión. El comportamiento concreto al enviar el formulario: **POR CONFIRMAR (P3)**                                      | CA1 · REQ-L01 · `"El login requiere email y contraseña. Ambos son obligatorios."`                                                                                                                            | Partición de equivalencia — contraseña vacía    | Bajo   |
