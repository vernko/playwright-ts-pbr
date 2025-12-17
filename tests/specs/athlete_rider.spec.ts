import { test, expect, Page } from '@playwright/test';
import { normalizeName } from '../helpers/utils';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.pbr.com/athletes#Riders')
})

test('selecting a rider displays their page', async ({ page }) => {
    const firstRider = await page.locator('.athleteBlock').first()
    const firstsRiderHeading = await firstRider.locator('h3').textContent()
    await firstRider.click()

    await page.locator('.athlete-head').waitFor()
    const riderName = await page.locator('.rider-name-custom').innerText()
    expect(firstsRiderHeading).toBe(await normalizeName(riderName))
})