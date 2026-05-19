import {test, expect} from '@playwright/test';

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

test.only('Browser context validating error login', async ({page}) => {
    const allproductTitles = page.locator('.card-body b');
    const productName = "zara coat 3";
    const page = await WebContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator(".card-body b").last().waitFor();
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

    const count = await allproductTitles.count();
    for (let i = 0; i < count; ++i) {
        const product = await allproductTitles.nth(i).locator('b').textContent();
        if (product === productName) {
            console.log("Product found");
            await allproductTitles.nth(i).locator('b').click();
            break;
        }
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text(\'zara coat 3\')').isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially('ind', {delay: 100});
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    //order confirmation
    const email = await page.locator('.user__name [type="text"]').textContent();
    console.log(email);
    await page.locator('.action__submit').click();
    const orderConfirmation = await page.locator('.hero-primary').textContent();
    expect(orderConfirmation).toBe("THANKYOU FOR THE ORDER.");
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
    //order history validation
    await page.locator('[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').click();
            break;
        }
    }
    //order details validation in order details page
    const orderDetailsId = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderDetailsId)).toBeTruthy();
});

test('UI Controls', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('[href*="documents-request"]');
    await dropdown.selectOption('consult');
    await page.locator('.radioButton').last().click();
    await page.locator('#okayBtn').click();

    // assertions to validate the radio button is selected
    await page.locator('.radioButton').last().isChecked();
    await expect(page.locator('.radioButton').last()).toBeChecked();

    await page.locator('#terms').click();
    expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(page.locator('#terms')).not.toBeChecked();
    //another way to assert above is
    // await expect(page.locator('#terms')).isChecked().toBeFalse();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

    await page.pause();
});

test('Child windows handling', async ({browser,page}) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const documentLink = page1.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);
    await newPage.waitForLoadState();
    const text =  await newPage.locator('.red').textContent();
    const arrayText = await text.split("@")
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await page1.locator('#username').fill(text);
    page1.pause()
    console.log(await page1.locator('#username').textContent());
});







