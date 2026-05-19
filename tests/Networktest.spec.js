import {test, expect} from '@playwright/test';
const fakePayloadOrders = {data: [], message: "No Orders"};

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator('#userEmail').fill('prrasad19845@gmail.com');
    await page.locator('#userPassword').fill('Prasad@2026');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});

    WebContext =  browser.newContext({storageState: 'state.json'});
});

test.only('Place the order', async ({page}) => {
    const allproductTitles = page.locator('.card-body b');
    const productName = "zara coat 3";
    const page = await WebContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.route("rahulshettyacademy.com/api/ecom/product/get-product-details/*", 
        route => 
            {
                //intercepting the api and modifying the response
                //interacting response ->Api response -> modify response -> send modified response to the browser
                const response = await page.request().fetch(route.request());
                let body = JSON.stringify(fakePayloadOrders);
                route.fulfill({
                    response,
                    body,
            });
    await page.locator("BUTTON[routerlink*='my-orders']").click();
    // await page.pause();
    await page.waitForResponse("rahulshettyacademy.com/api/ecom/product/get-product-details/*");
    console.log(await page.locator("mt.40").textContent());
  

   ;
});







