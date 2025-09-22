import { Page } from '@playwright/test';

export class LandingPage {
  private page: Page;
  private menuBurgerButton = '#react-burger-menu-btn';
  private linkAllItems = '#inventory_sidebar_link';
  private closeButton = '#react-burger-cross-btn';
  private addbagTocart="//div[@class='inventory_item_name '][text()='Sauce Labs Backpack']//following::button[@id='add-to-cart-sauce-labs-backpack']"
  private cartIcon = '.shopping_cart_link';
  private addIteminCart='.inventory_item_name';
  
  constructor(page: Page) {
    this.page = page;
  }

 
  async clickburgerButton(){
    await this.page.click(this.menuBurgerButton);
  }
 
 async clickcloseButton(){
    await this.page.click(this.closeButton);
  }

   async clickbagtoCart(){
    await this.page.click(this.addbagTocart);
  }

    async clickCarticon(){
    await this.page.click(this.cartIcon);
  }

  async getElementText(): Promise<string> {
    return await this.page.locator(this.addIteminCart).innerText();
  }
  
}
