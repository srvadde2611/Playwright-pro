import { Locator, Page } from "@playwright/test";


export default class Dashboardobjects
{
    page:Page;
    products:Locator;
    allproductTitles:Locator;
    cart:Locator;
    orders:Locator;

    constructor(page:Page){
        this.page = page;
        this.products = page.locator('.card-body');
        this.allproductTitles = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
        this.orders = page.locator('[routerlink*="myorders"]');
    }

    async searchProductAddToCart(productName:string){

        let count:any;
        let text:any;

        const titles = this.allproductTitles.allTextContents();
        console.log(titles);
        count = this.products.count();
        for (let i = 0; i < count; ++i) {
            
           if(await this.products.nth(i).locator('b').textContent() === productName){
               await this.products.nth(i).locator(text='Add To Cart').click();
                break;
              }
        }
    }   

    async navigateToCart(){
        await this.cart.click();
    }
}
// module.exports = {Dashboardobjects};