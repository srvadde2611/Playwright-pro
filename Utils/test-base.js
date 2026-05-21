import {base} from '@playwright/test';

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: 'prasad@gmail.com',
            password: 'Prasad@123',
            productName: 'zara coat 4'
        }
    }
);