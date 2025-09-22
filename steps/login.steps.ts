import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world"; 
import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import { assert } from "console";

let loginPage: LoginPage;
let landingPage: LandingPage;

Given("I open the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When("I login with {string} and {string}", async function (this: CustomWorld, username: string, password: string) {
  await loginPage.login("standard_user","secret_sauce");
});

Then("I should see the homepage", async function (this: CustomWorld) {
  await expect(this.page.locator(".header_label")).toHaveText("Swag Labs");
  landingPage = new LandingPage(this.page);
  await landingPage.clickburgerButton();
  await landingPage.clickcloseButton();
 
  
});

Then('I validate in the add cart page', async function (this: CustomWorld) {
          landingPage = new LandingPage(this.page);
         await landingPage.clickbagtoCart();
  await landingPage.clickCarticon();
 const errorText = await landingPage.getElementText();
  console.log("errorText",errorText);
        
        })
