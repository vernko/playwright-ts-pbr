import { test, expect } from '../helpers/fixtures'
import { Page, Locator } from '@playwright/test'
import { getFirstAthleteCard, openFirstAthleteProfile } from '../helpers/athletes';
import { SELECTORS, TIMEOUTS } from '../helpers/constants'
import { normalizeName } from '../helpers/utils';

async function clickSeasonTab(page: Page) {
  const seasonTab = page.locator('#season-tab')
  await seasonTab.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM })
  await seasonTab.evaluate(el => (el as HTMLElement).click())
  await expect(page.locator('#season-tab-pane')).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
}

test('selecting a rider displays their page', async ({ page }) => {
    const firstRider = await getFirstAthleteCard(page, 'Riders')
    const cardName = normalizeName(await firstRider.locator('h3').innerText())
    await firstRider.click()

    await expect(page.locator('.athlete-head')).toBeVisible()
    const riderName = normalizeName(await page.locator('.rider-name-custom').innerText())
    expect(cardName).toBe(normalizeName(riderName))
})

test('selecting the season tab displays the season data', async ({ page }) => {
    await openFirstAthleteProfile(page, 'Riders')
    await expect(page.locator(SELECTORS.RIDER_ATHLETE_HEAD)).toBeVisible();
    await clickSeasonTab(page)
    await expect(page.locator('#seasonHighestScore')).toBeVisible({ timeout: 5000 })
})

test('selecting a year in the season tab displays the data for that year', async ({ page }) => {
    await openFirstAthleteProfile(page, 'Riders')
    await expect(page.locator(SELECTORS.RIDER_ATHLETE_HEAD)).toBeVisible();

    await clickSeasonTab(page)

    const ninetyPt = page.locator('#seasonstat90Pt')
    const allNinetyPtRides = await ninetyPt.textContent()   

    await page.locator('#seasonSelectSeason').selectOption('2024')

    await expect(ninetyPt).not.toHaveText(allNinetyPtRides!)
})