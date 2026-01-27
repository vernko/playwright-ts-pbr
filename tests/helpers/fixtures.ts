import { test as base, Page } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from './constants';

/**
 * Dismisses the cookie banner if it appears on the page.
 * Silently continues if banner is not found.
 */
async function dismissCookieBanner(page: Page) {
  const cookieBanner = page.locator(SELECTORS.COOKIE_BANNER);
  try {
    // Check if banner is visible with a short timeout
    if (await cookieBanner.isVisible({ timeout: TIMEOUTS.SHORT })) {
      await cookieBanner.click();
      // Wait for animation to complete
      await page.waitForTimeout(500);
    }
  } catch (e) {
    // Banner not found or not clickable - that's fine, continue
  }
}

/**
 * Custom test fixture that automatically dismisses cookie banners on page load.
 * Usage: Import { test, expect } from '../helpers/fixtures' instead of '@playwright/test'
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // This runs BEFORE each test
    // Set up a listener that dismisses cookies whenever a page loads
    page.on('load', async () => {
      await dismissCookieBanner(page);
    });
    
    // Give the page to the test
    await use(page);
    
    // This runs AFTER each test (cleanup if needed)
    // Nothing to clean up for cookie banner
  },
});

// Re-export expect so tests can import both from one place
export { expect } from '@playwright/test';