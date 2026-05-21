import { AfterStep, Before, BeforeStep } from "@cucumber/cucumber";
import { POManager } from "../../Pageobjects/POManager";
import { playwright } from "@playwright/test";
import { Before , After, BeforeStep, AfterStep, Status} from "@cucumber/cucumber";

// Before({tags: "@Regression"}, async function () {

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

    // You can perform any setup tasks here, such as initializing test data or setting up the test environment.
});

After(async function () {

    console.log("Test execution completed. Performing cleanup tasks...");
});

BeforeStep(async function () {
    console.log("Before Step Hook: This will run before each step.");
    // You can perform any setup tasks here that need to be done before each step, such as resetting test data or clearing cookies.
});

AfterStep(async function (result) {
    console.log("After Step Hook: This will run after each step.");
     if (result.status === 'failed') {
        await this.page.screenshot({ path: `screenshots/step-failed-${Date.now()}.png` });
     }

    // You can perform any cleanup tasks here that need to be done after each step, such as taking screenshots on failure or logging step results.
});