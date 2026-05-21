import {test, expect} from '@playwright/test';

test.only('using diff  playwright locators', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder("Password").fill('abc123');
    await page.getByRole('Button', { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();
    await page.locator('input[type="checkbox"]').check();
});