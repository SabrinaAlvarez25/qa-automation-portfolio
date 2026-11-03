# QA Automation Portfolio — E2E & API Testing

![Playwright Tests](https://github.com/SabrinaAlvarez25/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.62-green?logo=playwright)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions)

Suite de pruebas automatizadas **End-to-End (UI)** y **API Testing** construida con **Playwright + TypeScript**, incorporando el patrón **Page Object Model (POM)**, integración continua en **GitHub Actions** y metodologías de aseguramiento de calidad asistidas con IA, manteniendo el criterio humano como filtro final.

---

## 🎯 Qué demuestra este repositorio

* **Automatización E2E:** pruebas funcionales de UI sobre diferentes flujos y aplicaciones de práctica, utilizando Playwright y locators semánticos.
* **Testing de APIs REST:** validación de contratos, códigos de estado HTTP, respuestas y comportamiento de APIs.
* **Page Object Model (POM) y Service Objects:** separación entre la lógica de las pruebas y las acciones/selectores de las páginas (`pages/`) o las llamadas a la API (`services/`).
* **Fixtures de Playwright:** preparación reutilizable (crear el page object, navegar, instanciar servicios) definida en `tests/fixtures.ts`.
* **Bugs documentados con evidencia:** defectos reales detectados y marcados con `test.fail()`, sin cambiar la expectativa para que el test "pase".
* **Integración Continua:** pipeline automatizado mediante **GitHub Actions** para ejecutar las pruebas.
* **Criterio QA basado en evidencia:** las decisiones de automatización y las correcciones se apoyan en requisitos, observaciones y resultados verificables.
* **Uso controlado de Inteligencia Artificial:** aplicación de skills, reglas y flujos de trabajo donde la IA propone y el QA verifica, decide y documenta.

---

## 📚 Evolución del proyecto

El repositorio documenta una evolución progresiva del aprendizaje en QA Automation:

* **S1–S6:** fundamentos de Playwright, locators semánticos, asincronía, ejecución de pruebas, diagnóstico basado en evidencia y validación de APIs.
* **S7:** definición de una estrategia de priorización de automatización basada en Frecuencia, Estabilidad, Riesgo y Mantenimiento.
* **S8:** organización de criterios QA y creación de reglas y skills reutilizables dentro de `.agents`.
* **S9:** derivación de casos de prueba a partir de historias de usuario y revisión asistida por IA, manteniendo el criterio humano como decisión final.
* **S10:** incorporación del primer conjunto de pruebas E2E del flujo de Login de **Academia Sin Humo**, con trazabilidad entre historia de usuario, requisitos, casos de prueba y automatización.
* **C11:** skill `diagnosticar-fallo-playwright` para leer un fallo, proponer la corrección y dejar la decisión a QA. Práctica de **Trace Viewer** en `tests/practica/`.
* **C13:** parametrización de los casos negativos de Login (C02–C05) y creación de **fixtures** propias (`tests/fixtures.ts`) con la skill `crear-fixture-playwright`.
* **C14:** page object de **Registro** generado y verificado por el agente `@pom-agent` (workflow `pom-agent.md` + skill `generar-pom`), con reporte en `reports/pom-agent-report.md` y aceptación final de QA.
* **Bloqueo de login (REQ-L03):** test de API contra el servidor real (C08) y test de pantalla con el servidor simulado mediante `page.route` (C09 · C10).
* **API de inscripción (`POST /api/enroll`):** seis tests basados en `docs/contrato-api.md`, usando un *service object* (`services/cursos.service.ts`); dos bugs documentados.

**Principio de trabajo:** la IA propone; QA verifica, decide y documenta.

---

## 🛠️ Stack Tecnológico

| Componente                      | Tecnología                        |
| :------------------------------ | :-------------------------------- |
| **Lenguaje**                    | TypeScript                        |
| **Framework de Automatización** | Playwright Test                   |
| **Arquitectura**                | Page Object Model (POM)           |
| **CI / CD**                     | GitHub Actions                    |
| **Reportes**                    | Playwright HTML Reporter & Traces |
| **Gestor de Paquetes**          | npm / Node.js                     |

---

## 📁 Estructura del Proyecto

```text
qa-automation-portfolio/
├── .agents/
│   ├── agents.md                     # Definición de agentes (@pom-agent, etc.)
│   ├── rules/
│   │   └── criterio-qa.md
│   ├── skills/
│   │   ├── automatizar-caso/
│   │   ├── crear-fixture-playwright/
│   │   ├── derivar-casos-de-hu/
│   │   ├── diagnosticar-fallo-playwright/
│   │   ├── generar-pom/
│   │   ├── priorizar-automatizacion/
│   │   └── revisar-con-rubrica/
│   └── workflows/
│       ├── generar-y-juzgar.md
│       └── pom-agent.md
│
├── .github/workflows/
│   └── playwright.yml                # CI en GitHub Actions
│
├── pages/                            # Page Objects
│   ├── login.page.ts                 # Login — Academia Sin Humo
│   ├── registro.page.ts              # Registro — Academia Sin Humo (C14)
│   ├── loginPage.ts                  # Login — SauceDemo (práctica)
│   └── cartPage.ts                   # Carrito — SauceDemo (práctica)
│
├── services/                         # Service Objects para API
│   ├── auth.service.ts               # POST /api/login
│   └── cursos.service.ts             # POST /api/enroll
│
├── tests/
│   ├── fixtures.ts                   # loginPage, registroPage, cursos
│   ├── e2e/
│   │   ├── login.spec.ts             # C01–C05
│   │   ├── login-bloqueo.spec.ts     # C09 · C10 (servidor simulado)
│   │   ├── registro.spec.ts          # C14
│   │   ├── login-academia.spec.ts    # Primer test E2E (sin POM)
│   │   └── cart.spec.ts              # SauceDemo (práctica)
│   ├── api/
│   │   ├── bloqueo.api.spec.ts       # C08 (servidor real)
│   │   ├── enroll.api.spec.ts        # POST /api/enroll
│   │   └── petstore.spec.ts          # Swagger Petstore (práctica)
│   ├── practica/                     # Trace Viewer
│   └── *.spec.ts                     # Ejercicios iniciales (S1–S6)
│
├── docs/                             # HU, casos, contratos, estrategia, selectores
├── evidence/                         # Evidencia de corridas y HTML de referencia
├── reports/
│   └── pom-agent-report.md
├── observaciones/
│   └── muestras-verificadas.md
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

# 🧪 Cobertura de Pruebas

## 1. Pruebas E2E de práctica — SauceDemo

El repositorio contiene **pruebas de práctica realizadas sobre SauceDemo**.

Estas pruebas fueron utilizadas durante el aprendizaje para ejercitar conceptos de:

* Playwright.
* Locators.
* Page Object Model (POM).
* Validaciones de UI.
* Automatización E2E.
* Interacción con formularios.
* Carrito de compras.
* Ordenamiento de productos.

### Escenarios practicados

* Login exitoso con credenciales válidas.
* Login con contraseña incorrecta.
* Validación de usuario bloqueado.
* Validación de campos vacíos.
* Usuario inexistente.
* Agregación de productos al carrito.
* Eliminación de productos.
* Validación del contador del carrito.
* Ordenamiento de productos por precio.

> **Importante:** las pruebas de SauceDemo son **ejercicios independientes de práctica**. No forman parte del flujo funcional de **Academia Sin Humo**, ni de sus historias de usuario, requisitos o estrategia de automatización.

---

## 2. Automatización E2E — Academia Sin Humo

Esta sección corresponde al **trabajo del curso de QA Automation**.

A diferencia de las pruebas de SauceDemo, este flujo se construye a partir de:

* Historias de usuario.
* Requisitos.
* Criterios de aceptación.
* Casos de prueba.
* Evidencia observada.
* Decisiones de automatización.
* Trazabilidad documental.

### Login — Casos automatizados actualmente

Actualmente se encuentran automatizados los primeros cinco casos seleccionados del flujo de Login:

| Caso    | Descripción                                                  | Requerimiento |
| :------ | :----------------------------------------------------------- | :------------ |
| **C01** | Login válido muestra mensaje de bienvenida                   | REQ-L04       |
| **C02** | Contraseña incorrecta muestra mensaje de error               | REQ-L02       |
| **C03** | Email no registrado muestra mensaje de error                 | REQ-L02       |
| **C04** | Login con email vacío muestra mensaje de error               | REQ-L01       |
| **C05** | Login con contraseña vacía muestra error y mantiene el formulario | REQ-L01       |

### Login — Bloqueo por intentos fallidos (REQ-L03)

| Caso          | Descripción                                                                 | Tipo        |
| :------------ | :-------------------------------------------------------------------------- | :---------- |
| **C08**       | El cuarto intento fallido todavía no bloquea (el bloqueo es al quinto)      | API · servidor real |
| **C09 · C10** | Con respuesta 429 simulada, la pantalla deshabilita el botón y muestra la espera | E2E · `page.route` |

> C08 está marcado con `test.fail()`: el servidor real bloquea al **cuarto** intento y REQ-L03 indica el **quinto** (bug observado el 28/10/2026).

### Registro — Page Object generado por agente (C14)

| Test | Qué verifica |
| :--- | :----------- |
| **Línea base** | Los campos nombre, email y contraseña son visibles |
| **Completo** | Los cinco controles: nombre, email, contraseña, edad y botón "Crear cuenta" |

El page object `pages/registro.page.ts` fue generado por `@pom-agent` a partir de `evidence/registro-form.html`, verificado con rúbrica (12/12) y ejecución real, y aceptado por QA. El test es la fuente de verdad: **no se modifica** para que el POM pase.

### Trazabilidad

Los tests se relacionan con la documentación del proyecto:

* `docs/HU-login.md` → Historia de usuario y requisitos.
* `docs/casos_prueba_login.md` → Casos de prueba.
* `docs/revision-login.md` → Revisión y decisiones QA.
* `docs/estrategia-automatizacion.md` → Estrategia de automatización.
* `docs/fuente-primer-test-e2e.md` → Fuente y trazabilidad del primer E2E.
* `docs/referencia de tests- E2E- de login.md` → Referencia de estructura de los tests.
* `docs/mapa-selectores.md` → Evidencia y selección de locators.
* `docs/HU-registro.md` + `evidence/registro-form.html` → Historia y evidencia del registro.
* `reports/pom-agent-report.md` → Reporte del agente POM (rúbrica, origen de locators, ejecución).
* `docs/contrato-api.md` → Contrato de `POST /api/enroll`.

### Estructura de los tests

Los casos siguen la estructura:

```text
PREPARAR
   ↓
ACTUAR
   ↓
VERIFICAR
```

Por ejemplo:

```text
PREPARAR
→ Abrir /login

ACTUAR
→ Completar email
→ Completar contraseña
→ Presionar "Iniciar sesión"

VERIFICAR
→ Comprobar el resultado esperado
```

### Ejecución

Los cinco casos automatizados de Login (C01–C05) se ejecutan correctamente:

```text
5 passed (11.2s)  
```

Comando utilizado:

```bash
npx playwright test tests/e2e/login.spec.ts
```

---

## 3. API REST

Los tests de API usan el fixture `request` de Playwright y *service objects* (`services/`) que encapsulan los endpoints, igual que los page objects encapsulan las pantallas.

### Academia Sin Humo — `POST /api/enroll`

Fuente: `docs/contrato-api.md`. Cada test arranca sin sesión ni inscripciones previas.

| Caso | Requerimiento | Escenario | Esperado |
| :--- | :------------ | :-------- | :------- |
| 1 | REQ-A03 | Curso con cupo | `200` · `inscrito` |
| 2 | REQ-A01 | Sin `courseId` | `400` · "El campo courseId es obligatorio" |
| 3 | REQ-A03 | Curso inexistente | `404` · "Curso no encontrado" |
| 4 | REQ-A03 | Curso sin cupos | `200` · `lista-espera` |
| 4 | REQ-C05 | En lista de espera no se muestra como inscrito | `displayStatus` ≠ `inscrito` |
| 5 | REQ-C06 | Prerequisito pendiente | `403` |

### Bugs encontrados

Los defectos se documentan con `test.fail()`: el test conserva la expectativa del requisito y queda en verde mientras el bug exista. Cuando se corrija, el test avisará.

| ID | Requerimiento | Comportamiento observado | Esperado | Fecha |
| :- | :------------ | :----------------------- | :------- | :---- |
| **BUG-ENROLL-01** | REQ-C06 | Con prerequisito pendiente responde `200 inscrito` | Rechazo `403` | 02/11/2026 |
| **BUG-ENROLL-02** | REQ-C05 | En lista de espera, `displayStatus` dice `inscrito` | No mostrar como inscrito | 02/11/2026 |
| **Bloqueo (C08)** | REQ-L03 | El servidor bloquea al 4.º intento fallido | Bloquear al 5.º | 28/10/2026 |

### Práctica — Swagger Petstore

`tests/api/petstore.spec.ts` ejercita un CRUD completo (GET por estado, POST, GET por ID, 404 y DELETE) sobre la API pública de Petstore.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Prerrequisitos

* Node.js
* npm
* Playwright

### 1. Clonar el repositorio

```bash
git clone https://github.com/SabrinaAlvarez25/qa-automation-portfolio.git
cd qa-automation-portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar Chromium para Playwright

```bash
npx playwright install chromium
```

### 4. Ejecutar todos los tests

```bash
npm test
```

### 5. Ejecutar las pruebas E2E

```bash
npx playwright test tests/e2e/
```

### 6. Ejecutar solamente los tests de Login de Academia Sin Humo

```bash
npx playwright test tests/e2e/login.spec.ts
```

### 7. Ejecutar solamente los tests de API

```bash
npx playwright test tests/api/
```

### 8. Ejecutar Playwright en modo UI

```bash
npm run test:ui
```

### 9. Visualizar el reporte

```bash
npm run report
```

---

## 🤖 Metodología QA & Asistencia con IA

El trabajo en este repositorio sigue una política de **criterio humano como filtro final**.

### Evidencia antes de decidir

Las hipótesis de fallo se contrastan con evidencia observable antes de realizar cambios.

Ejemplos:

* Resultado recibido por Playwright.
* Resultado esperado.
* Mensajes de error.
* Comportamiento real de la aplicación.
* Locators comprobados contra la aplicación.
* Requisitos documentados.

### Priorización

Los casos de prueba se priorizan utilizando dimensiones como:

* **Frecuencia**
* **Estabilidad**
* **Riesgo**
* **Mantenimiento**

La IA puede ayudar a analizar y proponer, pero la decisión final corresponde al QA.

### Skills y agentes

El proyecto incorpora recursos dentro de `.agents` para apoyar distintas actividades del proceso QA.

Entre ellos:

| Recurso | Propósito |
| :------ | :-------- |
| `skills/priorizar-automatizacion` | Priorizar casos por Frecuencia, Estabilidad, Riesgo y Mantenimiento |
| `skills/derivar-casos-de-hu` | Derivar casos de prueba desde historias de usuario |
| `skills/revisar-con-rubrica` | Revisar un artefacto de QA con una rúbrica de cuatro dimensiones (señala, no corrige) |
| `skills/automatizar-caso` | Convertir una fila «AUTOMATIZAR YA» del backlog en un test E2E trazable, usando POM y fixtures |
| `skills/crear-fixture-playwright` | Crear fixtures reutilizables |
| `skills/diagnosticar-fallo-playwright` | Leer un fallo, proponer la corrección y parar (la aplica QA) |
| `skills/generar-pom` | Generar y verificar un Page Object desde evidencia HTML |
| `workflows/generar-y-juzgar.md` | Juzgar un archivo de casos con `revisar-con-rubrica` y registrar las decisiones de QA |
| `workflows/pom-agent.md` | Recorrido de `@pom-agent`: hasta 3 intentos, entrega CANDIDATO o ESCALADO |
| `rules/criterio-qa.md` | Reglas de criterio QA que respetan todas las skills |

El agente nunca acepta su propio resultado: entrega un **candidato** y la decisión final la toma QA.

Estos recursos forman parte del aprendizaje sobre el uso de IA aplicada a QA Automation.

### Principio central

> **La IA propone; QA verifica, decide y documenta.**

---

## 🔎 Criterios de calidad

Las pruebas automatizadas siguen criterios definidos para evitar cambios basados únicamente en suposiciones:

* No inventar requisitos.
* No inventar endpoints.
* No asumir comportamientos que no fueron verificados.
* Utilizar locators semánticos cuando corresponda.
* Evitar esperas fijas.
* Comprobar los locators contra la aplicación real.
* Mantener trazabilidad entre requisitos, casos y automatización.
* Documentar los elementos que permanecen como `POR CONFIRMAR`.
* Validar los cambios ejecutando nuevamente los tests.

---

## 📌 Estado actual

El repositorio se encuentra en evolución como **portfolio de QA Automation**, documentando tanto el aprendizaje técnico de Playwright como la incorporación progresiva de criterios de análisis, trazabilidad, automatización e IA.

Actualmente conviven dos tipos de trabajo claramente diferenciados:

### Práctica técnica

**SauceDemo**

Ejercicios independientes utilizados para practicar automatización E2E, POM, locators y validaciones de UI.

### Trabajo del curso

**Academia Sin Humo**

Flujo de QA construido a partir de historias de usuario, requisitos, casos de prueba, evidencia, decisiones de automatización, tests E2E de Login y Registro, y tests de API con bugs documentados.

Esta separación permite diferenciar los ejercicios utilizados para aprender la herramienta del trabajo desarrollado sobre un flujo funcional documentado.

---

## 👩‍💻 Sobre el proyecto

Este repositorio forma parte de mi proceso de aprendizaje y desarrollo de habilidades en **QA Automation**, combinando:

* Testing manual y automatizado.
* Playwright.
* TypeScript.
* API Testing.
* Git y GitHub.
* CI/CD.
* Page Object Model.
* Diseño y revisión de casos de prueba.
* Trazabilidad.
* Uso de IA aplicada al proceso QA.

El objetivo es construir un portfolio que muestre no solamente la ejecución de tests, sino también el **razonamiento QA, la documentación, la evidencia y la toma de decisiones detrás de la automatización**.



