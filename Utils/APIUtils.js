class APIUTILS {

    constructor(apiContext,requestPayload,orderPayload){
        this.apiContext = apiContext;
        this.requestPayload = requestPayload;
        this.orderPayload = orderPayload;
    }

    async getToken() {
        const loginResponse = await apiContext.post('https://rahulshettyacademy.com/client/auth/login', {
            data: this.requestPayload
        });
        expect(loginResponse.status()).toBe(200);
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){ {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await apiContext.post('https://rahulshettyacademy.com/client/api/ecom/order/create-order', {
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
