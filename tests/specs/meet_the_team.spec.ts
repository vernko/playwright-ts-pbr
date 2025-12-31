import { test, expect } from '@playwright/test'
import { clickAndWaitForPopup, openNavLink } from '../helpers/utils'

test.beforeEach(async ({ page }) => {
    await openNavLink(
        page,
        'Meet the Teams',
        'Arizona Ridge Riders',
        'arizona-ridge-riders/',
        'PBR | Arizona Ridge Riders'
    )
})

test('user can view official team site', async ({ page }) => {
    const officialSiteLink = await page.getByRole('link', { name: 'Visit Official Site' })

    const popup = await clickAndWaitForPopup(
        page,
        officialSiteLink.click()
    )

    await expect(popup).toHaveURL(/arizonaridgeriders\.com/)
})

test('user can view team roster', async ({ page }) => {
    const rosterContainer = page.locator('.TeamRoster')
    
    await expect(rosterContainer).toBeVisible()
})