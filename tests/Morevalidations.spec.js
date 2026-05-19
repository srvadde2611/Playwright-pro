import {test, expect} from '@playwright/test';

test('popup validations', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack();
    // await page.waitForLoadState();
    // await page.goForward();
    // await page.waitForLoadState();
 await expect(page.locator('#displayed-text')).toBeVisible();
 await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();
     page.on('dialog', dialog => dialog.accept());
     page.pause();
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').click();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href*="lifetime-access"]:visible').click();
    const text = await framePage.locator('.text h2').textContent();
    console.log(text.split(' ')[1]);

});

test('screenshot and visual testing', async ({page}) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack();
    // await page.waitForLoadState();
    // await page.goForward();
    // await page.waitForLoadState();
 await expect(page.locator('#displayed-text')).toBeVisible();
 await page.locator('#displayed-text').screenshot({path: 'textbox.png'});
 await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#show-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeVisible();
     page.on('dialog', dialog => dialog.accept());
     page.pause();
    // await page.locator('#confirmbtn').click();
    // await page.locator('#mousehover').click();
    // const framePage = page.frameLocator('#courses-iframe');
    // await framePage.locator('li a[href*="lifetime-access"]:visible').click();
    // const text = await framePage.locator('.text h2').textContent();
    // console.log(text.split(' ')[1]);

});

//Visual testing
test.only('visual testing', async ({page}) => {
    await page.goto('https://flightaware.com/');
    await expect(page.screenshot()).toMatchSnapshot('landing.png');
});
