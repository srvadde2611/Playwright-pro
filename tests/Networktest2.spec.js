const { test,expect } = require("@playwright/test");


test('security test request interception', async ({page}) => {

    //login and reach  oders page

    const allproductTitles = page.locator('.card-body b');
    const productName = "zara coat 3";
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator('#userEmail').fill('prrasad19845@gmail.com');
    await page.locator('#userPassword').fill('Prasad@2026');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='my-orders']").click();

    await page.route("rahulshettyacademy.com/api/ecom/product/get-product-details?id=*"),
            route =>
                {
                    route.continue({url: "https://rahulshettyacademy.com/api/ecom/product/get-product-details?id=234354"});
    await page.locator("button.has-Text('view')").first().click();
    await page.pause();
    await expect(page.locator("p")).last().toHaveText("you are not authorized to view this product");
                }
});