
import {test as baseTest, expect} from '@playwright/test';

interface TestDataForOrder
{
    username:string;
    password:string;
    productName:string;
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder: {
            username: 'prasad@gmail.com',
            password: 'Prasad@123',
            productName: 'zara coat 4'
        }
    }
);