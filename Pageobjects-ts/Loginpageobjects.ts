import { Locator, Page} from "@playwright/test";

export default class Loginpageobjects 
{
    page:Page;
    signInButton:Locator;
    userName:Locator;
    password:Locator;
    constructor(page:Page){
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async validLogin(username:string, password:string){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

   async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    }
}
// export default Loginpageobjects;