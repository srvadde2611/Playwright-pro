import {test, expect} from '@playwright/test';

test.only('calender validations', async ({page}) => {

    const month = '6';
    const date = "15";
    const year = "2027";
    const expetedList = [month, date,year];
    await page.goto('https://rahulshettyacademy.com/SeleniumPractice/#/offers');
    await page.waitForLoadState();
    await page.locator('.react-date-picker__inputGroup').first().waitFor();
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__react-calendar__label').click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__monthss_month").nth(Number(month)-1).click();
    await page.locator("abbr[text()='"+date+"']").click();

    const inputs = await page.locator('.react-date-picker__inputGroup input').allTextContents();
    for(let i=0; i<expetedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expetedList[i]);
    }
});
    
