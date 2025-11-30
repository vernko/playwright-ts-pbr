import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://pbr.com')
    await page.getByRole('button', { name: 'Schedule'}).click()
    await page.getByRole('link', { name: 'Event Schedule'}).click()
})

test('a user can view event details', async ({ page }) => {
    const cards = await page.locator('.eventScheduleItem')
    const firstCard = await cards.filter({ has: page.getByRole('link', { name: 'Event Details' })}).first();
    const eventTitle = await firstCard.locator('h2').textContent()
    await firstCard.getByRole('link', { name: 'Event Details' }).click()

    const eventPageHeading = page.locator('.col-12.col-md-8 h2')
    await eventPageHeading.scrollIntoViewIfNeeded()
    await expect(eventPageHeading).toBeVisible()
    const eventPageHeadingText = await eventPageHeading.textContent()
    expect(eventPageHeadingText).toBe(eventTitle);
})