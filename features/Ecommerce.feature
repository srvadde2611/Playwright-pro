Feature: Ecommerce validations

@Regression
    Scenario: placing the order
        Given a login to ecommerce application with "prasad@gmail.com" and "prasad@123"
        When add 'Zara coat 4 ' to cart
        Then verify "zara coat 4 " is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the order history


