import {expect} from '@playwright/test';
class APIUTILS {

    apiContext:any;
    requestPayload:string;
    orderPayload:string;

    constructor(apiContext:any,requestPayload:string,orderPayload:string){
        this.apiContext = apiContext;
        this.requestPayload = requestPayload;
        this.orderPayload = orderPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/client/auth/login', {
            data: this.requestPayload
        });
        expect(loginResponse.status()).toBe(200);
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload:string){ {
        let response = {token: '', orderID: ''};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/client/api/ecom/order/create-order', {
            data: this.orderPayload,
            headers: {
                'Authorization': response.token,
                'content-type': 'application/json'
            }
        });
        expect(orderResponse.status()).toBe(201);
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderID = orderResponseJson.orders[0];
        console.log(orderID);
        response.orderID = orderID;
        return response;
    }

    module.exports = APIUTILS;

    }};
