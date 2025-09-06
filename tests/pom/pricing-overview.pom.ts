import { Locator, Page } from '@playwright/test';

export class PricingOverview {
  page: Page;

  premiumPlan: Locator;

  corporatePlan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.premiumPlan = page.locator('#pricing-premium');
    this.corporatePlan = page.locator('#pricing-corporate');
  }
}
