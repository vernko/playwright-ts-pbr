import { test, expect, Page } from '@playwright/test';
import { TIMEOUTS, URLS } from '../helpers/constants';

/**
 * Opens a results page from the Results dropdown
 * @param page - Playwright Page object
 * @param dropDownValue - The link text in the dropdown
 * @param options - Optional configuration
 * @param options.paneId - If the page uses tabs, wait for this pane ID (without '-pane' suffix)
 * @param options.cardTitle - If need to click a card after dropdown, the card's title text
 */
async function openResultsPage(
  page: Page, 
  dropDownValue: string,
  options?: {
    paneId?: string;
    cardTitle?: string;
  }
) {
  const resultsDropdown = page.locator('.dropdown-menu.dropdown-menu-end.show')
  await resultsDropdown.getByRole('link', { name: dropDownValue }).click()

  // If we need to click a card (All Around scenario)
  if (options?.cardTitle) {
    const cardLink = page.locator(`a:has(h4.font-Fixture:has-text("${options.cardTitle}"))`)
    await expect(cardLink).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
    await cardLink.click()
  }

  // Wait for the appropriate table based on scenario
  if (options?.paneId) {
    // Tab-based page (MVP Race)
    const pane = page.locator(`#${options.paneId}-pane`)
    const standingsTable = pane.locator('#standingsTable')
    await expect(standingsTable).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
  } else {
    // Simple page
    const standingsTable = page.locator('#standingsTable')
    await expect(standingsTable).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
  }
}

async function verifyStandingResultsDisplay(page: Page) {
    const tableContainer = page.locator('.table-responsive').first()
    await expect(tableContainer).toBeVisible()

    const standingsTable = page.locator('#standingsTable').first()
    await expect(standingsTable).toBeVisible()
    await expect(standingsTable.locator('thead tr th').first()).toBeVisible()
}

test.beforeEach(async ({ page }) => {
    await page.goto(URLS.HOME)
    await page.getByRole('button', { name: 'Results' }).click()
})

test('a user can view standings', async ({ page }) => {
    await openResultsPage(page, 'MVP Race', { paneId: 'regular-season'})
    await verifyStandingResultsDisplay(page)
})

test('a user can view standings in the all around standings', async ({ page }) => {
    await openResultsPage(page, 'All Tour Standings', { cardTitle: 'Bull Standings' })
    await verifyStandingResultsDisplay(page)
})