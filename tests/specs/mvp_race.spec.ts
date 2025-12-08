import { test, expect } from '@playwright/test'

async function normalizeCardName(cardName: string) {
    const normalizedCardName = cardName.split(/\s+/) // split on whitespace
        .filter(Boolean)  // remove empty strings
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) // Proper-case
        .join(' ');

    return normalizedCardName;
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.pbr.com/teams/regular-season-mvp/')
})

test('when a user selects a year, the standings display', async({ page }) => {
    await page.locator('[data-id="2024"]').waitFor()
    
    const responsePromise = page.waitForResponse(response => 
        response.url().includes('TeamRiderMVP')
    )
    
    await page.locator('[data-id="2024"]').click()
    
    const response = await responsePromise
    expect(response.url()).toContain('season=2024')
    
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
    const rowOneRider = table.locator('tbody tr').first().locator('td').nth(2).locator('a');
    await expect(rowOneRider).toBeVisible();
    const rowOneRiderText = (await rowOneRider.innerText()).trim();

    expect(rowOneRiderText).toBe(await normalizeCardName(topCardName));
})