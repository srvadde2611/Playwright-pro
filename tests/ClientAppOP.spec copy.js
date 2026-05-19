import {test, expect} from '@playwright/test';
import {customtest} from '../Utils/test-base.js';
import POManager from '../pageobjects/POManager.js';
import placeOrderTestData from '../testdata/placeOrderTestData.json' assert {type: 'json'};


for (const data of placeOrderTestData) {
test(`Client App Order Placement for ${data.productName}`, async ({page}) => {
    const poManager = new POManager(page);
    const allproductTitles = page.locator('.card-body b');
    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderID = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderID);
    expect(orderId).includes(await orderHistoryPage.getOrderDetailsId()).toBeTruthy();


    //wait for the cart page to load and validate the product is added to cart
   
    })
};

// another way to run the same test with different data sets is using custom test function and passing the data sets as parameters to the test function. This way we can avoid the loop and have a cleaner code.

    customtest(`Client App Order Placement`, async ({page,testDataForOrder}) => {
    const poManager = new POManager(page);
    const allproductTitles = page.locator('.card-body b');
    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderID = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderID);
    expect(orderId).includes(await orderHistoryPage.getOrderDetailsId()).toBeTruthy();


    //wait for the cart page to load and validate the product is added to cart
   
    })








