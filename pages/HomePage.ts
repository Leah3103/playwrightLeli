import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly getStartedLink: Locator;
    readonly searchButton: Locator;
    readonly installationHeading: Locator;
    
    constructor(page: Page) {
        super(page);
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.searchButton = page.getByText('Search');
        this.installationHeading = page.getByRole('heading', { name: 'Installation' });
    }

    /**
     * Navigate to the Playwright.dev homepage
     */
    async goto() {
        await this.navigateTo('/');
    }

    /**
     * Click the Get Started link and verify navigation
     */
    async clickGetStarted() {
        await this.clickElement(this.getStartedLink);
        await this.waitForElement(this.installationHeading);
    }

    /**
     * Click the Search button
     */
    async clickSearch() {
        await this.clickElement(this.searchButton);
    }

    /**
     * Verify the page title contains "Playwright"
     */
    async verifyPageTitle() {
        await this.verifyTitle('Playwright');
    }
}
