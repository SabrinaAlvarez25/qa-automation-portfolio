import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly addToCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly cartItems: Locator;
    readonly removeButtons: Locator;
    readonly sortDropdown: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('button[id^="add-to-cart"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.removeButtons = page.locator('button[id^="remove"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async addFirstProductToCart() {
        await this.addToCartButtons.first().click();
    }

    async addProductsToCart(count: number) {
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(0).click();
        }
    }

    async getCartCount(): Promise<string | null> {
        return this.cartBadge.textContent();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async removeFirstItemFromCart() {
        await this.removeButtons.first().click();
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getAllPrices(): Promise<number[]> {
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }
}