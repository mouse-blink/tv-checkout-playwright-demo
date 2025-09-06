import { FrameLocator, Locator, Page } from "@playwright/test";

export class Webchat {
    selfLocator: FrameLocator;
    closeButton: Locator
    constructor(page: Page) {
        this.selfLocator = page.frameLocator('iframe[title="Webchat view"]');
        this.closeButton = page.frameLocator('iframe[title="Webchat toggle button"]').locator('#button');
    }
    async close() {
        await this.closeButton.click();
    }
}