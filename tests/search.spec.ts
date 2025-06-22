import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

test.describe('Playwright.dev Search Functionality', () => {
    test('should be able to search for API documentation', async ({ page }) => {
        // Initialize page objects
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
        
        // Navigate to the homepage
        await homePage.goto();
        
        // Verify the page title
        await homePage.verifyPageTitle();
        
        // Click on the search button
        await homePage.clickSearch();
        
        // Verify search input is visible
        await searchPage.isSearchInputVisible();
        
        // Search for "API"
        await searchPage.search('API');
        
        // Verify search results contain "API"
        await searchPage.verifySearchResults('API');
    });
    
    test('should be able to search for specific features', async ({ page }) => {
        // Initialize page objects
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
        
        // Navigate to the homepage
        await homePage.goto();
        
        // Click on the search button
        await homePage.clickSearch();
        
        // Search for "Assertions"
        await searchPage.search('Assertions');
        
        // Verify search results
        await searchPage.verifySearchResults('Assertions');
    });
});
