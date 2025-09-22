import { setWorldConstructor } from "@cucumber/cucumber";
import { WebFactory } from "../webFactory/WebFactory";

export class CustomWorld {
  webFactory: WebFactory;

  constructor() {
    this.webFactory = new WebFactory();
  }

  async openBrowser(browserName: string = "chromium") {
    await this.webFactory.openBrowser(browserName);
  }

  async closeBrowser() {
    await this.webFactory.closeBrowser();
  }

  get page() {
    return this.webFactory.page;
  }
}

setWorldConstructor(CustomWorld);
