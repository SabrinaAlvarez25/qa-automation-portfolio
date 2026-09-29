# Fuente del primer test E2E: caso C01

Este archivo documenta la fuente del caso `C01` de `docs/casos_prueba_login.md`, que fue seleccionado como primer caso E2E a automatizar en el marco de S10.

El caso corresponde al ítem `L1` del backlog y al requerimiento `REQ-L04 / CA4` definidos en la documentación del proyecto.

> **No confundir:** `C01` es el número del caso de prueba. `C10` es otro caso de prueba del conjunto de login. El número de la clase (`S10`) tampoco corresponde al número del caso.

> **Estado:** el caso `C01` fue automatizado en `tests/e2e/login.spec.ts` y ejecutado correctamente. La última ejecución verificó los cuatro casos actualmente implementados en ese archivo: `C01`, `C02`, `C03` y `C04`, con resultado `4 passed`.

## El caso C01

| Campo                              | Decisión                                                                                                                                                                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Caso elegido**                   | `C01` · Login con credenciales válidas muestra el mensaje de bienvenida con el nombre. Corresponde al ítem `L1` del backlog y a `REQ-L04 / CA4`.                                                                                                                                                                   |
| **Por qué va primero**             | `L1` fue seleccionado como primer caso E2E para automatizar. El login es un flujo funcional de acceso y `REQ-L04 / CA4` establece que, después de un login exitoso, se debe mostrar un mensaje de bienvenida con el nombre del usuario.                                                                            |
| **Datos**                          | Email: `ana.garcia@ejemplo.com` · Contraseña: `Segura2026!`.                                                                                                                                                                                                                                                       |
| **Resultado observado**            | Después del login exitoso, la pantalla muestra el mensaje `¡Hola, Ana!`. También se observó el texto `Has iniciado sesión correctamente.`                                                                                                                                                                          |
| **Requisito frente a observación** | `REQ-L04 / CA4` exige que, después de un login exitoso, se muestre un mensaje de bienvenida con el nombre del usuario. El requisito no fija literalmente el texto del mensaje ni especifica si debe utilizar el nombre de pila o el nombre completo. En la evidencia observada, la pantalla muestra `¡Hola, Ana!`. |
| **Qué NO demuestra este test**     | No demuestra que el nombre mostrado sea el correcto según una regla de negocio no documentada. Tampoco demuestra la persistencia de la sesión al navegar, la carga del catálogo ni el comportamiento frente a credenciales inválidas. Esas situaciones corresponden a otros casos o requerimientos.                |

## Relación con otros archivos

* `docs/casos_prueba_login.md` contiene la definición del caso `C01`.
* `docs/HU-login.md` contiene el requerimiento `REQ-L04 / CA4` relacionado con el mensaje de bienvenida.
* `docs/estrategia-automatizacion.md` contiene el ítem `L1` del backlog y la decisión de automatización.
* `docs/revision-login.md` registra la revisión de los casos de login y las decisiones tomadas durante el ejercicio.
* `docs/mapa-selectores.md` contiene la documentación de los locators utilizados para el login.
* `tests/e2e/login.spec.ts` contiene la automatización del caso `C01` junto con los casos `C02`, `C03` y `C04`.

## Relación entre la fuente y el test

La trazabilidad del primer E2E queda representada de la siguiente manera:

`docs/casos_prueba_login.md`
↓
`C01`
↓
`L1`
↓
`REQ-L04 / CA4`
↓
`tests/e2e/login.spec.ts`
m