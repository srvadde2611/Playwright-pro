import { Locator, Page } from "@playwright/test";

let message : string = "Hello";
message = 1; // This will give a type error because we have declared the variable message as a string and we are trying to assign a number to it. In TypeScript, we need to specify the type of the variable and we cannot assign a value of a different type to it.

let age : number = 25; // This is a valid assignment because we have declared the variable age as a number and we are assigning a number to it.

let numberArray : number[] = [1, 2, 3, 4, 5]; // This is a valid assignment because we have declared the variable number as an array of numbers and we are assigning an array of numbers to it.

let data : any = "Hello"; // This is a valid assignment because we have declared the variable data as any type and we can assign any type of value to it.
data = 1; // This is also a valid assignment because we have declared the variable data as any type and we can assign any type of value to it. However, using any type is not recommended because it defeats the purpose of using TypeScript and can lead to potential bugs in the code. It is better to use specific types for variables to ensure type safety and catch errors at compile time.

let user : {name: string, age: number} = {name: "John", age: 30}; // This is a valid assignment because we have declared the variable user as an object with specific properties and we are assigning an object with those properties to it. However, if we try to assign an object with different properties or missing properties, it will give a type error. For example, if we try to assign {name: "John"} to user, it will give a type error because the age property is missing.
user.location = "USA"; // This will give a type error because we have declared the variable user as an object with specific properties and we are trying to add a new property to it. In TypeScript, we cannot add new properties to an object that has been declared with specific properties. We need to either declare the variable user as any type or use an interface to define the structure of the object and allow for additional properties.

class cartPage {
    page:Page;
    cartProducts: Locator;
    ProductsText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.ProductsText = page.locator('.card-body b');
    }
}

