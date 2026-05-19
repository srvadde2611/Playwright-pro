import {test, expect} from '@playwright/test';
import {customTest} from '../Utils-ts/test-base.ts';
import POManager from '../Pageobjects-ts/POManager.ts';
// import POManager from '../Pageobjects-ts/POManager.ts';
// import placeOrderTestData from '../testdata/placeOrderTestData.json' assert {type: 'json'};

const dataSet = JSON.parse(JSON.stringify("../testdata/placeOrderTestData.json"));


for (const data of dataSet) {
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
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    let rowOrderId:any;
    const orderID = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToCart();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderID, rowOrderId);
    expect(orderId).includes(await orderHistoryPage.getOrderId()).toBeTruthy();


    //wait for the cart page to load and validate the product is added to cart
   
    })
};

// another way to run the same test with different data sets is using custom test function and passing the data sets as parameters to the test function. This way we can avoid the loop and have a cleaner code.

    customTest(`Client App Order Placement`, async ({page,testDataForOrder}) => {
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
    await cartPage.Checkout();

    let orderId:any;
    let rowOrderId:any;

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderID = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToCart();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderID, rowOrderId);
    expect(orderId).includes(await orderHistoryPage.getOrderId()).toBeTruthy();


    //wait for the cart page to load and validate the product is added to cart
   
    })








