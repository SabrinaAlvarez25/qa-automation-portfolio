# QA Automation Portfolio — E2E & API Testing

![Playwright Tests](https://github.com/SabrinaAlvarez25/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.x-green?logo=playwright)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions)

Suite de pruebas automatizadas **End-to-End (UI)** y **API Testing** construida con **Playwright + TypeScript**, incorporando el patrón **Page Object Model (POM)**, integración continua en **GitHub Actions** y metodologías de aseguramiento de calidad asistidas con IA, manteniendo el criterio humano como filtro final.

---

## 🎯 Qué demuestra este repositorio

* **Automatización E2E:** pruebas funcionales de UI sobre diferentes flujos y aplicaciones de práctica, utilizando Playwright y locators semánticos.
* **Testing de APIs REST:** validación de contratos, códigos de estado HTTP, respuestas y comportamiento de APIs.
* **Page Object Model (POM):** separación entre la lógica de las pruebas y las acciones/selectores de las páginas.
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
│   ├── agents.md
│   ├── rules/
│   │   └── criterio-qa.md
│   ├── skills/
│   │   ├── priorizar-automatizacion/
│   │   ├── derivar-casos-de-hu/
│   │   └── revisar-con-rubrica/
│   └── workflows/
│       └── generar-y-juzgar.md
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── loginPage.ts
│   └── cartPage.ts
│
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   └── cart.spec.ts
│   └── orden-ejecucion.spec.ts
│
├── docs/
│   ├── HU-login.md
│   ├── casos_prueba_login.md
│   ├── revision-login.md
│   ├── estrategia-automatizacion.md
│   ├── contrato-api.md
│   ├── mapa-selectores.md
│   ├── js-esencial.md
│   ├── fuente-primer-test-e2e.md
│   └── referencia de tests- E2E- de login.md
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

Actualmente se encuentran automatizados los primeros cuatro casos seleccionados del flujo de Login:

| Caso    | Descripción                                                             | Requerimiento |
| :------ | :---------------------------------------------------------------------- | :------------ |
| **C01** | Login válido muestra mensaje de bienvenida                              | REQ-L04       |
| **C02** | Contraseña incorrecta muestra mensaje de error                          | REQ-L02       |
| **C03** | Email no registrado muestra mensaje de error                            | REQ-L02       |
| **C04** | Quinto intento fallido consecutivo bloquea la cuenta y muestra el timer | REQ-L03       |

### Trazabilidad

Los tests se relacionan con la documentación del proyecto:

* `docs/HU-login.md` → Historia de usuario y requisitos.
* `docs/casos_prueba_login.md` → Casos de prueba.
* `docs/revision-login.md` → Revisión y decisiones QA.
* `docs/estrategia-automatizacion.md` → Estrategia de automatización.
* `docs/fuente-primer-test-e2e.md` → Fuente y trazabilidad del primer E2E.
* `docs/referencia de tests- E2E- de login.md` → Referencia de estructura de los tests.
* `docs/mapa-selectores.md` → Evidencia y selección de locators.

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

### Ejecución actual

Los cuatro casos automatizados de Login se ejecutan correctamente:

```text
4 passed
```

Comando utilizado:

```bash
npx playwright test tests/e2e/login.spec.ts
```

---

## 3. API REST

El repositorio también contiene trabajo de validación de APIs REST realizado durante el curso.

Se documentan aspectos como:

* Métodos HTTP.
* Códigos de estado.
* Contratos de API.
* Respuestas JSON.
* Validaciones basadas en evidencia.
* Diferencias entre comportamiento esperado y comportamiento observado.

La documentación correspondiente se encuentra principalmente en:

```text
docs/contrato-api.md
```

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

### 7. Ejecutar Playwright en modo UI

```bash
npm run test:ui
```

### 8. Visualizar el reporte

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

* Priorización de automatización.
* Derivación de casos de prueba desde historias de usuario.
* Revisión mediante rúbrica.
* Reglas de criterio QA.
* Workflows de generación y revisión.

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

Flujo de QA construido a partir de historias de usuario, requisitos, casos de prueba, evidencia, decisiones de automatización y tests E2E.

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

