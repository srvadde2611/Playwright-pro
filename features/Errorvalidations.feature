Feature: Ecommerce validations

@validation
    Scenario: placing the order
        Given a login to Ecommerce2 application with "rahulshetty" and "learning"
        Then error message is displayed

        Scenario Outline: placing the order details
        Given a login to ecommerce application with "<username>" and "<password>"
        Then error message is displayed


Examples:
    | unsername | Header password2 | |
    | Valprasad@gmail.com | prasad@123 | 
    | helloa@gmail.com | Iamhello@123|
    Value 3  |


