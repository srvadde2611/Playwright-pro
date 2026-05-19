import {test, expect} from '@playwright/test';

class Cartpage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator('div li').first();
        this.productsText = page.locator('.cart-body b');
        this.cart = page.locator('[routerlink*="cart"]');
        this.orders = page.locator('[routerlink*="myorders"]');
        this.checkout = page.locator('text=Checkout');
    }
    async verifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }
}
module.exports = {Cartpage};