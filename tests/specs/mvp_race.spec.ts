import { test, expect } from '@playwright/test'
import { TIMEOUTS, URLS } from '../helpers/constants';
import { normalizeName } from '../helpers/utils'

test.describe.configure({ retries: 2 })

test.beforeEach(async ({ page }) => {
    await page.goto(URLS.MVP_RACE, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUTS.NAVIGATION
    })
})

test('when a user selects a year, the standings display', async({ page }) => {
    const yearButton = page.locator('[data-id="2024"]')
    await expect(yearButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
    await yearButton.click()
    
    const yearSlideActive = yearButton.locator('.seasonBlock.active')
    await expect(yearSlideActive).toBeVisible()
    
    const activePane = page.locator('#regular-season-pane.tab-pane.active')
    const table = activePane.locator('#standingsTable')
    await expect(table).toBeVisible()
})

test('when a user selects the championship MVP tab, the standings display', async({ page }) => {
    await page.locator('#champion-tab').click()
    const activePane = page.locator('#championship-pane.tab-pane.active')
    await expect(activePane).toBeVisible()

    const topCard = activePane.locator('.standingsTop3').first()
    const topCardName = (await topCard.locator('h3').nth(1).innerText()).trim()

    const table = activePane.locator('#standingsTable');
    const rowOneRider = table.locator('tbody tr').first().locator('td').nth(2).locator('a')
    await expect(rowOneRider).toBeVisible();
    const rowOneRiderText = (await rowOneRider.innerText()).trim();

    expect(rowOneRiderText).toBe(normalizeName(topCardName));
})