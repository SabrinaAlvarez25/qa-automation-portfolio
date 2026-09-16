import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe('Login - SauceDemo', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('login exitoso con usuario válido', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('login fallido con contraseña incorrecta', async () => {
        await loginPage.login('standard_user', 'clave_incorrecta');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    });

    test('login con usuario bloqueado', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('locked out');
    });

    test('login con campos vacíos', async () => {
        await loginPage.login('', '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username is required');
    });

    test('login con usuario que no existe', async () => {
        await loginPage.login('usuario_fantasma', 'secret_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    });
});
