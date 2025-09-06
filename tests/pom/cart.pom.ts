import { Page, Locator } from '@playwright/test';

export default class Cart {
  readonly page: Page;

  readonly cartTable: Locator;

  readonly addonsContent: Locator;

  readonly firstAddonButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#shopping-cart-table');
    this.addonsContent = page.locator('#addons-content');
    this.firstAddonButton = this.addonsContent.locator('.cart-addon-product').first().locator('button');
  }

  async screenshotCartTable() {
    await this.cartTable.screenshot();
  }

  async clickFirstAddonButton() {
    await this.firstAddonButton.click();
  }
}
