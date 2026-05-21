import { Given, When,Then } from "@cucumber/cucumber";
import {POManager} from '../../Pageobjects/POManager.js';
import { test, expect, playwright } from "@playwright/test";

Given('a login to ecommerce application with {string} and {string}', { timeout: 10000 }, async function (username, password) {
    const browser = await playwright.chromium.launch({headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.poManager = new POManager(page);
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
});
// 
When('add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToCart();


    // const dashboardPage = this.poManager.getDashboardPage();
    // await dashboardPage.searchProductAddToCart(productName);
    // await dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();
});

When('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderID = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderID);
});

Then('Verify order is present in the order history', async function () {
    await this.dashboardPage.navigateToCart();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderID, rowOrderId);
    expect(orderId).includes(await orderHistoryPage.getOrderId()).toBeTruthy();
});

// Given('a login to Ecommerce2 application with {string} and {string}', async function (userName, password) {
//     const userNameField = this.page.locator('#username');
//     const passwordField = this.page.locator('#password');
//     const signInButton = this.page.locator('#signInBtn');
//     await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     console.log(await this.page.title());
//     await userNameField.fill(userName);
//     await passwordField.fill(password);
//     await signInButton.click();
// });
// 
// Then('error message is displayed', async function () {
//     const errorMessage = this.page.locator("[style*='block']");
//     await expect(errorMessage).toHaveText("Incorrect username/password.");
// });
