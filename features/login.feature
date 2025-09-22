Feature: Login functionality

  Scenario: User logs in successfully
    Given I open the login page
    When I login with "user" and "password"
    Then I should see the homepage
    Then I validate in the add cart page