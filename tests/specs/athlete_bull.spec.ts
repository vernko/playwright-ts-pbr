import { test, expect } from '@playwright/test';
import { normalizeName } from '../helpers/utils';
import { openAthletesTab, openFirstBullProfile } from '../helpers/athletes';

test('selecting a bull displays their page', async ({ page }) => {
    const firstBull = await openAthletesTab(page, 'Bulls');
    const firstBullHeading = normalizeName(await firstBull.locator('h3').first().innerText());
    await firstBull.locator('.athleteBlock').first().click();

    await expect(page.locator('.athleteHead')).toBeVisible();

    const bullName = await page.locator('.athleteHead h2').innerText();

    expect(firstBullHeading).toBe(normalizeName(bullName));
})

test('selecting the Rides tab displays rides data', async ({ page }) => {
    await openFirstBullProfile(page);

    const ridesTab = page.getByRole('tab', { name: 'Rides' });
    await expect(ridesTab).toBeVisible();
    await ridesTab.click();

    const ridesPane = page.locator('#ride-tab-pane');
    await expect(ridesPane).toBeVisible();

    await expect(ridesPane.getByRole('columnheader', { name: /rider/i })).toBeVisible();
    await expect(ridesPane.getByRole('columnheader', { name: /score/i })).toBeVisible();
});