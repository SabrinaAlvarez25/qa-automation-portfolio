import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { CartPage } from '../../pages/cartPage';

test.describe('Carrito de compras - SauceDemo', () => {
    let loginPage: LoginPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('agregar un producto muestra el contador en 1', async () => {
        await cartPage.addFirstProductToCart();
        const count = await cartPage.getCartCount();
        expect(count).toBe('1');
    });

    test('agregar varios productos actualiza el contador', async () => {
        await cartPage.addProductsToCart(3);
        const count = await cartPage.getCartCount();
        expect(count).toBe('3');
    });

    test('sacar un producto del carrito', async () => {
        await cartPage.addFirstProductToCart();
        await cartPage.goToCart();
        await cartPage.removeFirstItemFromCart();
        await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('ordenar productos de menor a mayor precio', async () => {
        await cartPage.sortBy('lohi');
        const prices = await cartPage.getAllPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    test('ordenar productos de mayor a menor precio', async () => {
        await cartPage.sortBy('hilo');
        const prices = await cartPage.getAllPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });
});