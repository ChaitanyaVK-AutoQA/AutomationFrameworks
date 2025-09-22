import { getDriver, closeDriver } from "./DriverManager";
import { Page } from "playwright";

export class WebFactory {
  page!: Page;

  async openBrowser(browserName: string = "chromium") {
    this.page = await getDriver(browserName);
  }

  async closeBrowser() {
    await closeDriver();
  }
}
