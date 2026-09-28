import { test, expect } from '@playwright/test';

test('C01 - Login válido', async ({ page }) => {
    await page.goto('https://playground.calidadsinhumo.com/login');

    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
    await page.getByLabel('Contraseña').fill('Segura2026!');

    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await expect(page.getByText('¡Hola, Ana!')).toBeVisible();
});