import { test, expect, Page, Locator } from '@playwright/test';
import { normalizeName } from '../helpers/utils';

let firstRider: Locator;

async function clickSeasonTab(page: Page) {
  const seasonTab = page.getByRole('tab', { name: 'SEASON' })
  await seasonTab.waitFor({ state: 'visible', timeout: 15000 })
  await seasonTab.click()
  await expect(page.locator('#season-tab-pane')).toBeVisible()
}

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://www.pbr.com/athletes#Riders')
    firstRider = page.locator('.athleteBlock').first()

    if (testInfo.title !== 'selecting a rider displays their page') {
        const firstRider = page.locator('.athleteBlock').first()
        await firstRider.click()
        await page.waitForLoadState('domcontentloaded')
    }
})

test('selecting a rider displays their page', async ({ page }) => {
    const firstRiderHeading = await firstRider.locator('h3').textContent()
    await firstRider.click()

    await page.locator('.athlete-head').waitFor()
    const riderName = await page.locator('.rider-name-custom').innerText()
    expect(firstRiderHeading).toBe(normalizeName(riderName))
})

test('selecting the season tab displays the season data', async ({ page }) => {
    await clickSeasonTab(page)
    await expect(page.locator('#seasonHighestScore')).toBeVisible({ timeout: 5000 })
})

test('selecting a year in the season tab displays the data for that year', async ({ page }) => {
    const year = '2024'

    await clickSeasonTab(page)

    const ninetyPt = page.locator('#seasonstat90Pt')
    const allNinetyPtRides = await ninetyPt.textContent()   

    await page.locator('#seasonSelectSeason').selectOption(year)

    await expect(ninetyPt).not.toHaveText(allNinetyPtRides!)
})