# Referencia de tests E2E de login

Este documento describe la relación entre los casos de prueba de login definidos en el proyecto y su implementación como tests E2E con Playwright.

El objetivo es mantener la trazabilidad entre:

* los casos de prueba definidos en la documentación;
* los requerimientos y criterios de aceptación;
* la estrategia de automatización;
* los tests E2E implementados.

## Fuente de los casos

Los casos utilizados para los primeros tests E2E están definidos en:

`docs/casos_prueba_login.md`

Los requerimientos y criterios de aceptación relacionados se encuentran en:

`docs/HU-login.md`

La decisión de automatización se encuentra en:

`docs/estrategia-automatizacion.md`

La revisión y las decisiones sobre los casos se encuentran en:

`docs/revision-login.md`

Los selectores utilizados como referencia se encuentran en:

`docs/mapa-selectores.md`

La implementación de los tests se encuentra en:

`tests/e2e/login.spec.ts`

---

## Casos actualmente automatizados

Actualmente se encuentran automatizados cuatro casos de login:

| Caso | Requerimiento | Situación cubierta                                                | Test            |
| ---- | ------------- | ----------------------------------------------------------------- | --------------- |
| C01  | REQ-L04 / CA4 | Login con credenciales válidas y mensaje de bienvenida            | `login.spec.ts` |
| C02  | REQ-L02 / CA2 | Login con contraseña incorrecta y mensaje de error                | `login.spec.ts` |
| C03  | REQ-L02 / CA2 | Login con email no registrado y mensaje de error                  | `login.spec.ts` |
| C04  | REQ-L03 / CA3 | Quinto intento fallido consecutivo, bloqueo y botón deshabilitado | `login.spec.ts` |

Estos cuatro casos corresponden al alcance actualmente automatizado en el proyecto.

---

## C01 · Login válido

**Caso:** C01

**Backlog:** L1

**Requerimiento:** REQ-L04 / CA4

**Fuente:** `docs/casos_prueba_login.md`

**Objetivo:** verificar que un usuario pueda iniciar sesión con credenciales válidas y que, después del login, se muestre un mensaje de bienvenida con el nombre del usuario.

**Datos utilizados:**

* Email: `ana.garcia@ejemplo.com`
* Contraseña: `Segura2026!`

**Resultado observado:** durante la verificación del flujo se observó el mensaje:

`¡Hola, Ana!`

También se observó:

`Has iniciado sesión correctamente.`

**Importante:** REQ-L04 / CA4 exige un mensaje de bienvenida con el nombre del usuario, pero no fija literalmente la redacción del mensaje. Los textos anteriores corresponden a la evidencia observada durante la verificación del flujo.

**Implementación:** `tests/e2e/login.spec.ts`

---

## C02 · Contraseña incorrecta

**Caso:** C02

**Requerimiento:** REQ-L02 / CA2

**Fuente:** `docs/casos_prueba_login.md`

**Objetivo:** verificar que una contraseña incorrecta produzca un mensaje de error y no permita completar el login.

**Datos utilizados:**

* Email: `ana.garcia@ejemplo.com`
* Contraseña: `clave_incorrecta`

**Resultado observado:** se muestra el mensaje:

`Email o contraseña incorrectos`

**Implementación:** `tests/e2e/login.spec.ts`

---

## C03 · Email no registrado

**Caso:** C03

**Requerimiento:** REQ-L02 / CA2

**Fuente:** `docs/casos_prueba_login.md`

**Objetivo:** verificar que un email no registrado produzca un mensaje de error.

**Datos utilizados:**

* Email: `noexiste@ejemplo.com`
* Contraseña: `Segura2026!`

**Resultado observado:** se muestra el mensaje:

`Email o contraseña incorrectos`

**Implementación:** `tests/e2e/login.spec.ts`

---

## C04 · Quinto intento fallido y bloqueo

**Caso:** C04

**Requerimiento:** REQ-L03 / CA3

**Fuente:** `docs/casos_prueba_login.md`

**Objetivo:** verificar el comportamiento definido para cinco intentos fallidos consecutivos.

**Flujo:**

1. Se accede a la pantalla de login.
2. Se realizan intentos consecutivos utilizando una contraseña incorrecta.
3. Se comprueba el comportamiento después del quinto intento fallido.
4. Se verifica que aparezca el mensaje de cuenta bloqueada.
5. Se verifica que el botón de inicio de sesión quede deshabilitado.

**Implementación:** `tests/e2e/login.spec.ts`

---

## Estructura de los tests

Los tests E2E siguen una estructura común:

### PREPARAR

Se prepara el estado inicial del caso, por ejemplo accediendo a:

`/login`

### ACTUAR

Se realizan las acciones correspondientes al caso:

* completar email;
* completar contraseña;
* hacer clic en el botón de inicio de sesión;
* repetir el intento cuando el caso lo requiere.

### VERIFICAR

Se comprueba el resultado esperado mediante assertions de Playwright.

Esta separación permite distinguir claramente:

`PREPARAR → ACTUAR → VERIFICAR`

---

## Trazabilidad

La relación entre la documentación y la implementación es:

```text
docs/casos_prueba_login.md
        ↓
Caso de prueba
        ↓
Requerimiento / Criterio de aceptación
        ↓
docs/estrategia-automatizacion.md
        ↓
tests/e2e/login.spec.ts
```

Para los cuatro casos actualmente automatizados:

```text
C01 → L1 → REQ-L04 / CA4 → login.spec.ts
C02 → REQ-L02 / CA2     → login.spec.ts
C03 → REQ-L02 / CA2     → login.spec.ts
C04 → REQ-L03 / CA3     → login.spec.ts
```

---

## Alcance actual

Este documento describe únicamente los casos que actualmente forman parte de la implementación E2E de login:

* C01
* C02
* C03
* C04

No se agregan aquí otros casos del conjunto de login que todavía no forman parte de la implementación actual.

El alcance puede cambiar posteriormente mediante una decisión documentada de QA.

---

## Evidencia de ejecución

Los cuatro tests actualmente implementados fueron ejecutados con:

```text
npx playwright test tests/e2e/login.spec.ts
```

Resultado:

```text
4 passed
```

La ejecución confirma que los cuatro tests implementados actualmente pasan en la ejecución realizada.
