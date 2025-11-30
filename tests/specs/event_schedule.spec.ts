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

test('a user can get general tickets', async ({ page }) => {
    const cards = await page.locator('.eventScheduleItem')
    const firstCard = await cards.filter({ has: page.getByRole('link', { name: 'General Tickets' })}).first()
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        firstCard.getByRole('link', { name: 'General Tickets' }).click()
    ]);

    // using this because the ticket vendor seems to be different depending on the type of event
    const newUrl = newTab.url()
    expect(newUrl).toBeTruthy()
    expect(newUrl).not.toBe('about:blank')
})