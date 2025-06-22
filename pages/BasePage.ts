import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for an element to be visible
     * @param locator The element locator
     */
    async waitForElement(locator: Locator) {
        expect(locator).toBeVisible(); // Wait for the element to be visible
    }

    /**
    * Wait for an elements to be visible
    * @param locator The element locator
    */
    async waitForElements(locator: Locator, number: number = 1) {

        await expect(async () => {
            const currentCount = await locator.count();
            console.log(`Current count: ${currentCount}`);
            expect(currentCount).toBeGreaterThanOrEqual(number); // Ensure at least one element is found
        }).toPass({ timeout: 8000 }); // Retry for up to 8 seconds
    }

    /**
     * Click on an element
     * @param locator The element locator
     */
    async clickElement(locator: Locator) {
        await locator.click();
    }

    /**
     * Fill a form field
     * @param locator The element locator
     * @param text The text to fill
     */
    async fillField(locator: Locator, text: string) {
        await locator.fill(text);
    }

    /**
     * Get text content of an element
     * @param locator The element locator
     * @returns The text content
     */
    async getTextContent(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }

    /**
     * Verify page title contains expected text
     * @param titleText The expected title text
     */
    async verifyTitle(titleText: string) {
        await expect(this.page).toHaveTitle(new RegExp(titleText));
    }
}
