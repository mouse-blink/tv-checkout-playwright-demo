import { FrameLocator, Locator, Page } from '@playwright/test';

export default class Webchat {
  selfLocator: FrameLocator;

  closeButton: Locator;

  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.selfLocator = page.frameLocator('iframe[title="Webchat view"]');
    this.closeButton = page.frameLocator('iframe[title="Webchat toggle button"]').locator('#button');
  }

  async close() {
    await this.closeButton.click();
  }

  async removeFromDOM() {
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe').forEach(iframe => {
        iframe.remove();
      });
    });
  }
}

