import { test, expect } from '@playwright/test';

test('PRÁCTICA — analizar un fallo con Trace Viewer', async ({ page }) => {
    await page.goto('https://playground.calidadsinhumo.com/login');

    await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toHaveText('Entrar');
});