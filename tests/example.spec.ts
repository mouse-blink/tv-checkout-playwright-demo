import { test, expect } from '@playwright/test';
import CookieBanner from './pom/cookie-banner.pom';
import Webchat from './pom/webchat.pom';
import GEOLOCATIONS from './i18n/geolocations';
import PricingOverview from './pom/pricing-overview.pom';
import Cart from './pom/cart.pom';


GEOLOCATIONS.forEach((location) => {
  test.describe(`Prices Overview <${location.name}>`, () => {
    test.beforeEach(async ({ page }) => {
      await setupPricingPage(page, location);
    });

    test('has title', async ({ page }) => {
      await expect(page).toHaveTitle(location.pages.pricing.title);
    });

    test('has prices', async ({ page }) => {
      const pricingOverview = new PricingOverview(page);

      await expect(pricingOverview.premiumPlan).toHaveScreenshot();
      await expect(pricingOverview.corporatePlan).toHaveScreenshot();
    });


    test('can see default shopping cart', async ({ page }) => {
      await goToCart(page);
      const webChat = new Webchat(page);
      const cart = new Cart(page);

      await expect(webChat.closeButton).toBeVisible();
      await webChat.removeFromDOM();

      await expect(cart.cartTable).toHaveScreenshot();
    });

    test('can modify shopping cart', async ({ page }) => {
      await goToCart(page);
      const webChat = new Webchat(page);

      await expect(webChat.closeButton).toBeVisible();
      await webChat.removeFromDOM();

      const priceUpdate = page.waitForResponse(response =>
        response.url().includes('/rest/V1/adobe-analytics/products') &&
        response.request().method() === 'POST',
      );

      const cart = new Cart(page);

      await cart.clickFirstAddonButton();
      await priceUpdate;
      await expect(cart.cartTable).toHaveScreenshot();
    });
  });

});

async function setupPricingPage(page, location) {
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
  await webChat.removeFromDOM();
}

async function goToCart(page) {
  const pricingOverview = new PricingOverview(page);
  const priceOffer = await pricingOverview.selectPremiumPlan();

  await priceOffer.buyNow();
  await expect(page).toHaveURL(/\/checkout\/cart\/\?p=premium$/);

  return { pricingOverview, priceOffer };
}

;
;
