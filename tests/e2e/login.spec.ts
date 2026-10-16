import { test, expect } from '../fixtures';

/**
 * Trazabilidad:
 * - Caso: C01 — Login válido (docs/revision-login.md)
 * - Backlog: L1 — Login con credenciales válidas muestra mensaje de bienvenida con el nombre (docs/estrategia-automatizacion.md)
 * - Requerimiento: REQ-L04 / CA4 (docs/HU-login.md)
 */
test('C01 · L1 · REQ-L04: Login válido muestra mensaje de bienvenida', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.saludo).toBeVisible();
  await expect(loginPage.page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C02 — Login con contraseña incorrecta (docs/casos_prueba_login.md)
 * - Requerimiento: REQ-L02 / CA2 (docs/HU-login.md)
 */
test('C02 · REQ-L02: Login con contraseña incorrecta muestra mensaje de error', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'clave_incorrecta');

  // VERIFICAR
  await expect(loginPage.mensajeError).toBeVisible();
  await expect(loginPage.saludo).not.toBeVisible();
  await expect(loginPage.botonIniciarSesion).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C03 — Login con email no registrado (docs/casos_prueba_login.md)
 * - Requerimiento: REQ-L02 / CA2 (docs/HU-login.md)
 */
test('C03 · REQ-L02: Login con email no registrado muestra mensaje de error', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('noexiste@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.mensajeError).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C04 — Login con email vacío
 * - Requerimiento: REQ-L01 / CA1 (docs/HU-login.md)
 */
test('C04 · REQ-L01: Login con email vacío muestra mensaje de error', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.mensajeError).toBeVisible();
  await expect(loginPage.saludo).not.toBeVisible();
  await expect(loginPage.botonIniciarSesion).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C05 · REQ-L01 · CA1
 * - Fuente: docs/casos-login-v2.md §5 (material de clase)
 * - Requerimiento: REQ-L01 / CA1 (docs/HU-login.md)
 */
test('C05 · REQ-L01 · CA1: Login con contraseña vacía muestra error y mantiene el formulario', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', '');

  // VERIFICAR
  await expect(loginPage.mensajeError).toHaveText('La contraseña es obligatoria');
  await expect(loginPage.saludo).not.toBeVisible();
  await expect(loginPage.botonIniciarSesion).toBeVisible();
});

