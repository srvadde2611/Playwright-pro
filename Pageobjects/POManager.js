import {Loginpageobjects} from '../pageobjects/Loginpageobjects.js';
import {Dashboardobjects} from '../pageobjects/Dashboardobjects.js';

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new Loginpageobjects(page);
        this.dashboardPage = new Dashboardobjects(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }
}
module.exports = POManager;