import Loginpageobjects from './Loginpageobjects.ts';
import Dashboardobjects from './Dashboardobjects.ts';
import OrderHistoryPage  from './OrderHistoryPage.ts';
import OrderReviewPage from './OrderReviewPage.ts';
import Cartpage from './Cartpage.ts';
import { Page } from '@playwright/test';

export default class POManager
{
    loginPage:Loginpageobjects;
    dashboardPage:Dashboardobjects;
    orderHistoryPage:OrderHistoryPage;
    orderReviewPage:OrderReviewPage;
    cartPage:Cartpage;
    page:Page;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new Loginpageobjects(this.page);
        this.dashboardPage = new Dashboardobjects(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
        this.cartPage = new Cartpage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
    
    getOrdersReviewPage(){
        return this.orderReviewPage;
    }
    getCartPage(){
        return this.cartPage;
    }
}
// export default POManager;