import { Locator } from '@playwright/test';

export default class PriceOffer {
  selfLocator: Locator;

  buyNowButton: Locator;

  constructor(selfLocator: Locator) {
    this.selfLocator = selfLocator;
    this.buyNowButton = this.selfLocator.locator(
      'div:nth-child(2) > price-component:nth-child(1) > div:nth-child(5) > custom-button:nth-child(1) > div:nth-child(1) > a:nth-child(1)',
    );
  }

  async buyNow() {
    await this.buyNowButton.click();
  }
}
