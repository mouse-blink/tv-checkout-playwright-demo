import { Locator, Page } from '@playwright/test';
import PriceOffer from './price-offer.pom';

export default class PricingOverview {
  page: Page;

  premiumPlan: Locator;

  corporatePlan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.premiumPlan = page.locator('#pricing-premium');
    this.corporatePlan = page.locator('#pricing-corporate');
  }

  async selectPremiumPlan(): Promise<PriceOffer> {
    return new PriceOffer(this.premiumPlan);
  }

}
