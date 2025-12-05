import { test, expect, Page } from '@playwright/test';

async function openResultsPage(page: Page, dropDownValue: string) {
    const resultsDropdown = await page.locator('.dropdown-menu.dropdown-menu-end.show')
    await resultsDropdown.getByRole('link', { name: dropDownValue }).click()
}

async function verifyStandingResultsDisplay(page: Page) {
    const tableContainer = page.locator('.table-responsive').first()
    await tableContainer.scrollIntoViewIfNeeded()

    const standingsTable = page.locator('#standingsTable').first()
    await expect(standingsTable).toBeVisible()
    await expect(standingsTable.locator('thead tr th').first()).toBeVisible()
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://pbr.com')
    await page.getByRole('button', { name: 'Results'}).click()
})

test('a user can view standings', async ({ page }) => {
    const dropDownValue = 'MVP Race'

    await openResultsPage(page, dropDownValue)
    await verifyStandingResultsDisplay(page)
})

test('a user can view standings in the all around standings', async ({ page }) => {
    const dropDownValue = 'All Tour Standings'
    const leaderboardValue = 'Bull Standings'

    await openResultsPage(page, dropDownValue)

    const cardLink = page
    .locator('p.card-text', { hasText: leaderboardValue })
    .locator('xpath=ancestor::a')

    await expect(cardLink).toBeAttached()
    await cardLink.scrollIntoViewIfNeeded()
    await expect(cardLink).toBeVisible()
    await cardLink.click()

    await verifyStandingResultsDisplay(page)
})