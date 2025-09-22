import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  const browserName = process.env.BROWSER || "chromium"; // Use env variable
  await this.openBrowser(browserName);
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});
