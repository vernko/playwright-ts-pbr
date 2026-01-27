import { test, expect } from '../helpers/fixtures'
import { getFirstAthleteCard, openFirstAthleteProfile } from '../helpers/athletes';
import { SELECTORS } from '../helpers/constants';
import { normalizeName } from '../helpers/utils';

test('selecting a bull displays their page', async ({ page }) => {
    const firstBull = await getFirstAthleteCard(page, 'Bulls');
    const firstBullHeading = normalizeName(await firstBull.locator('h3').first().innerText());
    await firstBull.first().click();

    await expect(page.locator('.athleteHead')).toBeVisible();

    const bullName = await page.locator('.athleteHead h2').innerText();

    expect(firstBullHeading).toBe(normalizeName(bullName));
})

test('selecting the Rides tab displays rides data', async ({ page }) => {
    await openFirstAthleteProfile(page, 'Bulls');
    await expect(page.locator(SELECTORS.BULL_ATHLETE_HEAD)).toBeVisible();

    const ridesTab = page.getByRole('tab', { name: 'Rides' });
    await expect(ridesTab).toBeVisible();
    await ridesTab.click();

    const ridesPane = page.locator('#ride-tab-pane');
    await expect(ridesPane).toBeVisible();

    await expect(ridesPane.getByRole('columnheader', { name: /rider/i })).toBeVisible();
    await expect(ridesPane.getByRole('columnheader', { name: /score/i })).toBeVisible();
});