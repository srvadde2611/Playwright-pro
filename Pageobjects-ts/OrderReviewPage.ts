import { expect,Page, Locator } from "@playwright/test";

export default class OrderReviewPage 
{
    page:Page;
    country:Locator;
    dropdown:Locator;
    emailId:Locator;
    submit:Locator;
    orderConfirmation:Locator;
    orderId:Locator;
    
    constructor(page:Page) {
        this.page = page;
        this.country = page.locator('[placeholder*="Country"]');
        this.dropdown = page.locator('.ta-results');
        this.emailId = page.locator('.user__name [type="text"]').first();
        this.submit = page.locator('.action__submit');
        this.orderConfirmation = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');

    }

    async searchCountryAndSelect(countryCode:string, countryName:string) {
        await this.country.pressSequentially(countryCode, { delay: 100 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator('button').count();
        for (let i = 0; i < optionsCount; ++i) {
            let text:any;
            text = await this.dropdown.locator('button').nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator('button').nth(i).click();
                break;
            }
        }
    }

    async submitAndGetOrderId() {
        await this.submit.click();
        await this.orderConfirmation.waitFor();
        let orderIdText:any;
        orderIdText = await this.orderId.textContent();
        const orderId = orderIdText.split('|')[1].trim();
        return orderId;
    }

    async verifyEmailId(userName:string){
        await expect(this.emailId).toHaveText(userName);
    }
}
// export default OrderReviewPage;