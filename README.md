# QA Automation Portfolio — E2E & API Testing

![Playwright Tests](https://github.com/SabrinaAlvarez25/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.x-green?logo=playwright)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions)

Suite profesional de pruebas automatizadas **End-to-End (UI)** y **API Testing** construida con **Playwright + TypeScript**, implementando el patrón **Page Object Model (POM)**, integración continua en **GitHub Actions** y metodologías de aseguramiento de calidad potenciadas con IA con criterio técnico y gates de validación humana.

---

## 🎯 Qué demuestra este repositorio

- **Automatización E2E robusta:** Pruebas funcionales de UI sobre flujos críticos (autenticación, validaciones de formulario, carrito de compras, ordenamiento dinámico de productos) desacopladas mediante el patrón **Page Object Model (POM)**.
- **Testing de APIs REST:** Validación de contratos de API (OpenAPI / Swagger), códigos de estado HTTP (`200`, `404`), cabeceras, tiempos de respuesta y esquemas JSON con el cliente nativo de Playwright.
- **Integración Continua (CI/CD):** Pipeline automatizado en **GitHub Actions** que ejecuta la suite de tests en cada push/PR y genera artefactos descargables con el reporte HTML de Playwright.
- **Criterio QA y Diagnóstico Empírico:** Diagnóstico estructurado de fallos a partir de evidencia concreta (`Timeout`, `Received`, `Expected`) antes de aplicar cambios mínimos y verificables.
- **Flujos con Inteligencia Artificial Controlada:** Aplicación del método **A.T.E.R.R.I.Z.A.** y evaluación de riesgos bajo matriz de 4 dimensiones (Frecuencia, Estabilidad, Riesgo, Mantenimiento) con **Gates Humanos** donde la IA propone y el QA valida.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| **Lenguaje** | TypeScript |
| **Framework de Automatización** | Playwright Test |
| **Arquitectura** | Page Object Model (POM) |
| **CI / CD** | GitHub Actions |
| **Reportes** | Playwright HTML Reporter & Traces |
| **Gestor de Paquetes** | npm / Node.js (v20+) |

---

## 📁 Estructura del Proyecto

```text
qa-automation-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml       # Pipeline CI en GitHub Actions
├── pages/                       # Page Objects (POM)
│   ├── loginPage.ts             # Acciones y selectores de Login
│   └── cartPage.ts              # Acciones y selectores de Carrito e Inventario
├── tests/
│   ├── e2e/                     # Suites de pruebas E2E (UI)
│   │   ├── login.spec.ts        # Casos de Login (positivo, inválido, bloqueado, vacíos)
│   │   └── cart.spec.ts         # Casos de Carrito (agregar, eliminar, ordenar precios)
│   ├── api/                     # Suites de pruebas de API REST
│   │   └── petstore.spec.ts     # CRUD y validación de contrato HTTP (OpenAPI / Swagger)
│   ├── orden-ejecucion.spec.ts  # Control de asincronía y selectores semánticos
│   └── primer-ciclo.spec.ts     # Validaciones iniciales reproducibles
├── docs/                        # Estrategia, contratos y protocolos de QA
│   ├── 00-PROTOCOLO-orquestador.md     # Protocolo de orquestación A.T.E.R.R.I.Z.A.
│   ├── estrategia-automatizacion.md   # Matriz de riesgos y priorización de pruebas
│   ├── contrato-api.md                # Análisis y auditoría de contrato de API
│   ├── flujo-ia-diagnostico-fallos.md # Protocolo de diagnóstico de fallos con IA
│   └── swagger-petstore-extracto.md   # Especificación OpenAPI de referencia
├── playwright.config.ts         # Configuración global de Playwright (reintentos en CI, trazas)
├── package.json
└── tsconfig.json
```

---

## 🧪 Cobertura de Pruebas

### 1. UI E2E (SauceDemo)
- **Autenticación:**
  - Login exitoso con credenciales válidas y redirección al inventario.
  - Bloqueo y mensaje de error ante contraseña incorrecta.
  - Detección de usuario bloqueado (`locked_out_user`).
  - Validación de campos requeridos (vacíos).
  - Manejo de usuario inexistente.
- **Carrito y Catálogo:**
  - Incremento dinámico del contador en el badge del carrito.
  - Agregación múltiple de productos.
  - Eliminación de ítems desde la vista del carrito.
  - Verificación de ordenamiento por precio: de menor a mayor (`lohi`) y de mayor a menor (`hilo`).

### 2. API REST (Swagger Petstore)
- **`GET /pet/findByStatus`:** Filtrado de mascotas, validación de status 200, header `application/json` y consistencia del array de respuesta.
- **`POST /pet`:** Creación de entidad, payload JSON y validación de propiedades devueltas.
- **`GET /pet/{id}`:** Consulta de entidad por identificador único.
- **`GET /pet/{invalid_id}`:** Validación de código de error `404 Not Found`.
- **`DELETE /pet/{id}`:** Eliminación y comprobación de descarte.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Prerrequisitos
- Node.js (versión 18 o superior recomendada)
- npm

### 1. Clonar el repositorio
```bash
git clone https://github.com/SabrinaAlvarez25/qa-automation-portfolio.git
cd qa-automation-portfolio
```

### 2. Instalar dependencias y navegadores
```bash
npm install
npx playwright install chromium
```

### 3. Ejecutar los tests

```bash
# Ejecutar toda la suite en modo headless
npm test

# Ejecutar con la interfaz visual interactiva de Playwright
npm run test:ui

# Ejecutar únicamente las pruebas E2E
npx playwright test tests/e2e/

# Ejecutar únicamente las pruebas de API
npx playwright test tests/api/
```

### 4. Visualizar el reporte de resultados
```bash
npm run report
```

---

## 🤖 Metodología QA & Asistencia con IA

El trabajo en este repositorio sigue una política de **criterio humano como filtro final**:

- **Diagnóstico basado en evidencia:** Toda hipótesis de fallo debe sustentarse con logs observables de Playwright (`Received` vs `Expected`) antes de proponer una corrección.
- **Matriz de Priorización:** Los casos se seleccionan según impacto real en el negocio mediante la evaluación de *Frecuencia*, *Estabilidad*, *Riesgo* y *Costo de Mantenimiento*.
- **Gates de Aprobación:** La IA acelera la generación y diagnóstico, pero ningún cambio ni caso de prueba entra al repositorio sin validación y firma explícita del QA.
