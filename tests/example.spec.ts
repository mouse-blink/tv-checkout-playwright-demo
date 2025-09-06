import { test, expect } from '@playwright/test';
import { CookieBanner } from './pom/cookie-banner.pom';
import { Webchat } from './pom/webchat.pom';
import GEOLOCATIONS from './i18n/geolocations';
import { PricingOverview } from './pom/pricing-overview.pom';

GEOLOCATIONS.forEach((location) => {
  test.describe(`Prices Overview <${location.name}>`, () => {
    test.beforeEach(async ({ page }) => {
      await page.context().addCookies([
        {
          name: 'geo-preference',
          value: location.locale,
          domain: '.teamviewer.com',
          path: '/',
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
      ]);
      await page.goto(`https://www.teamviewer.com${location.endpoint}`);
      const i18nResponse = page.waitForResponse((response) =>
        response.url().startsWith('https://engage.teamviewer.com/api/in/i18n'),
      );

      await new CookieBanner(page).acceptCookies();
      await i18nResponse;

      await page.locator('#button-hero-pricing').click();
      await page.waitForURL('**/pricing/overview/', { timeout: 120_000 });
      const webChat = new Webchat(page);

      await expect(webChat.closeButton).toBeVisible({ timeout: 120_000 });
      await webChat.close();
    });

    test('has title', async ({ page }) => {
      await expect(page).toHaveTitle(location.pages.pricing.title);
    });

    test('Has Prices', async ({ page }) => {
      const pricingOverview = new PricingOverview(page);

      await expect(pricingOverview.premiumPlan).toHaveScreenshot();
      await expect(pricingOverview.corporatePlan).toHaveScreenshot();
    });
  });
});
