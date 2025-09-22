import { chromium, firefox, webkit, Browser, Page, BrowserType } from "playwright";

let browser: Browser;
let page: Page;

export async function getDriver(browserName: string = "chromium"): Promise<Page> {
  if (!browser) {
    let browserType: BrowserType<Browser>;

    switch (browserName.toLowerCase()) {
      case "firefox":
        browserType = firefox;
        break;
      case "webkit":
        browserType = webkit;
        break;
      case "chromium":
      default:
        browserType = chromium;
        break;
    }

    browser = await browserType.launch({ headless: false });
    page = await browser.newPage();
  }
  return page;
}

export async function closeDriver(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = undefined as unknown as Browser;
    page = undefined as unknown as Page;
  }
}
