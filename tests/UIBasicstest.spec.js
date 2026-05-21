import { test, expect } from "@playwright/test";

test.only('First playwright test', async({browser})=>
{
    // Create a new browser context and page
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body b');

    // Navigate to the desired URL
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await username.fill("rahulshetty");
    await password.fill('learning');
    await signInBtn.click();

    // Wait for the page to load and display the desired content
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    await username.fill("rahulshettyacademy");
    await password.fill('learning');
    await signInBtn.click();
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.first().textContent());
    await cardTitles.allTextContents();
    console.log(await cardTitles.allTextContents());

})
    
    // Perform actions or assertions on the page
    // For example, you can check if the title is correct?

 test('page playwight test', async({page})=>{
await page.goto('https://google.com/');

//get the title of the page
const title = await page.title();
console.log(title);
await expect(page).toHaveTitle('Google');
});