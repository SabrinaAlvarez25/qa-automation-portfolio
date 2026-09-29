import { test, expect } from '@playwright/test';

/**
 * Trazabilidad:
 * - Caso: C01 — Login válido (docs/revision-login.md)
 * - Backlog: L1 — Login con credenciales válidas muestra mensaje de bienvenida con el nombre (docs/estrategia-automatizacion.md)
 * - Requerimiento: REQ-L04 / CA4 — Tras un login exitoso, el sistema muestra un mensaje de bienvenida con el nombre del usuario (docs/HU-login.md)
 */
test('C01 · L1 · REQ-L04: Login válido muestra mensaje de bienvenida', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  // Nota: '¡Hola, Ana!' y 'Has iniciado sesión correctamente.' son textos observados en la evidencia de docs/revision-login.md.
  // La HU / REQ-L04 exige que se muestre un mensaje de bienvenida con el nombre del usuario, pero no fija literalmente esa redacción.
  await expect(page.getByText('¡Hola, Ana!')).toBeVisible();
  await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C02 — Login con contraseña incorrecta (docs/casos_prueba_login.md)
 * - Requerimiento: REQ-L02 / CA2 — Una contraseña incorrecta muestra un mensaje de error (docs/HU-login.md)
 */
test('C02 · REQ-L02: Login con contraseña incorrecta muestra mensaje de error', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
  await page.getByLabel('Contraseña').fill('clave_incorrecta');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C03 — Login con email no registrado (docs/casos_prueba_login.md)
 * - Requerimiento: REQ-L02 / CA2 — Un email no registrado muestra un mensaje de error (docs/HU-login.md)
 */
test('C03 · REQ-L02: Login con email no registrado muestra mensaje de error', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('noexiste@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
});

/**
 * Trazabilidad:
 * - Caso: C04 — Quinto intento fallido consecutivo (docs/casos_prueba_login.md)
 * - Requerimiento: REQ-L03 / CA3 — Después de 5 intentos fallidos consecutivos, la cuenta se bloquea por 30 segundos, el botón de login debe estar deshabilitado y muestra timer visual (docs/HU-login.md)
 */
test('C04 · REQ-L03: Quinto intento fallido consecutivo bloquea la cuenta y muestra timer', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  for (let i = 1; i <= 5; i++) {
    const submitButton = page.getByRole('button', { name: 'Iniciar sesión' });
    if (await submitButton.isVisible()) {
      await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
      await page.getByLabel('Contraseña').fill(`clave_erronea_${i}`);
      await submitButton.click();
      await page.waitForResponse(res => res.url().includes('/api/login'));
    }
  }

  // VERIFICAR
  await expect(page.getByText(/Cuenta bloqueada\. Puedes intentar de nuevo en/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bloqueado' })).toBeDisabled();
});
