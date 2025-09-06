import { test, expect } from "@playwright/test";
import { CookieBanner } from "./pom/cookie-banner.pom";
import { Webchat } from "./pom/webchat.pom";

test.beforeEach(async ({ page }) => {
  await page.context().addCookies([
    {
      name: "geo-preference",
      value: "en-EU",
      domain: ".teamviewer.com",
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
  await page.goto("https://www.teamviewer.com/en/");
  const i18nResponse = page.waitForResponse((response) =>
    response.url().startsWith("https://engage.teamviewer.com/api/in/i18n")
  );
  await new CookieBanner(page).acceptCookies();
  await i18nResponse;
});

test("has title", async ({ page }) => {
  await page.locator("#button-hero-pricing").click();
  await page.waitForURL("**/pricing/overview/", { timeout: 120_000 });
  const webChat = new Webchat(page);
  await expect(webChat.closeButton).toBeVisible({ timeout: 120_000 });
  await webChat.close();
  await expect(page).toHaveTitle(`Prices and license overview | TeamViewer`);
  await expect(page.locator("#pricing-premium")).toHaveScreenshot();
  await expect(page.locator("#pricing-corporate")).toHaveScreenshot();
});
