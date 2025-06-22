import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#docsearch-input');
        this.searchResults = page.locator('#docsearch-list');
    }

    /**
     * Check if the search input is visible
     */
    async isSearchInputVisible() {
        await this.waitForElement(this.searchInput);
    }

    /**
     * Search for a specific term
     * @param text The text to search for
     */
    async search(text: string) {
        await this.fillField(this.searchInput, text);
        await this.waitForElements(this.searchResults);
    }

    /**
     * Verify search results contain the expected text
     * @param expectedText The expected text in search results
     */
    async verifySearchResults(expectedText: string) {

        //loop through search results and check if any contain the expected text
        const resultsCount = await this.searchResults.count();
        for (let i = 0; i < resultsCount -1; i++) {
            const currentItem = await this.searchResults.nth(i);
            const resultsText =  await this.getTextContent(currentItem); 
            await expect(currentItem, resultsText + "failed").toContainText(expectedText);
        }
    }
}
