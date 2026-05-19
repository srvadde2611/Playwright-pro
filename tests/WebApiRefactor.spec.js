import {test, expect} from '@playwright/test';
import {APIUTILS} from '../Utils/APIUtils';
const loginPayload = {userEmail: 'anshika@gmail.com', userPassword: 'Anishika@123'};
const orderPayload = {orders: [{country: 'India', productOrderedId: 1}]};

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload, orderPayload);
    //  token = await APIUtils.getToken();
    //  console.log(token);
     response = await APIUtils.createOrder(orderPayload);
     console.log(response.orderID);
}
    );

    //create order is success

    test('place the order', async ({page}) => {
        page.addInitScript((value) => { 
            window.localStorage.setItem('token', value);
        }, response.token);
        await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
        await page.locator(".button[routerlink*='my-orders']").last().click();
        await page.locator('tbody').waitFor();
        const rows = await page.locator('tbody tr');
        const rowCount = await rows.count();
        for (let i = 0; i < rowCount; ++i) {
            const rowOrderId = await rows.nth(i).locator('th').textContent();
            if (rowOrderId.includes(response.orderID)) {
                await rows.nth(i).locator('button').click();
                break;
            }
        }
        const orderDetails = await page.locator('.col-text').allTextContents();
        expect(orderDetails).toContain(response.orderID);
    });