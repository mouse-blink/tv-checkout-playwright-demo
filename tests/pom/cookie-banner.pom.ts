import { Page, Locator } from '@playwright/test';

export default class CookieBanner {
  readonly selfLocator: Locator;

  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.selfLocator = page.locator('#onetrust-banner-sdk');
    this.acceptButton = this.selfLocator.locator('#onetrust-accept-btn-handler');
  }

  async acceptCookies() {
    await this.acceptButton.click();
  }
}
