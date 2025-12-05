import { test, expect, Page, Locator } from '@playwright/test'

async function countHidden(locator: Locator) {
  return locator.evaluateAll(items =>
    items.filter(el => {
      const style = window.getComputedStyle(el);
      return (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0'
      );
    }).length
  );
}

async function countVisible(locator: Locator) {
  return locator.evaluateAll(items =>
    items.filter(el => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      );
    }).length
  );
}

async function getFirstCard(page: Page, text: string) {
    const firstCard = await page.locator('.eventScheduleItem').filter({hasText: text }).first()

    await firstCard.scrollIntoViewIfNeeded()
    await expect(firstCard).toBeVisible()

    return firstCard;
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://pbr.com')
    await page.getByRole('button', { name: 'Schedule'}).click()
    await page.getByRole('link', { name: 'Event Schedule'}).click()
})

test('a user can filter events', async ({ page }) => {
    const filterValue = 'UTB'
    await page.locator('#eventTourSelect.form-select').selectOption(filterValue)
    await expect(page.locator(`.eventScheduleItem.${filterValue}`).first()).toBeVisible()

    const matchingItems = await page.locator(`.eventScheduleItem.${filterValue}`)

    const nonMatchingItems = await page.locator(`.eventScheduleItem:not(.${filterValue})`)

    const nonMatchingItemsCount = await nonMatchingItems.count()
    
    const matchingHidden = await countHidden(matchingItems)

    const nonMatchingVisible = await countVisible(nonMatchingItems)
    const nonMatchingHidden = await countHidden(nonMatchingItems)

    expect(matchingHidden).toBe(0)
    expect(nonMatchingVisible).toBe(0)
    expect(nonMatchingHidden).toBe(nonMatchingItemsCount)
})

test('a user can view event details', async ({ page }) => {
    const text = 'Event Details';

    const firstCard = await getFirstCard(page, text);
    const eventTitle = await firstCard.locator('h2').textContent();

    await Promise.all([
        page.waitForURL('**', { waitUntil: 'load' }),
        firstCard.locator('a', { hasText: text }).click()
    ]);

    const eventPageHeading = page.locator('.col-12.col-md-8 h2').first();
    await expect(eventPageHeading).toBeVisible();

    const eventPageHeadingText = await eventPageHeading.textContent();
    expect(eventPageHeadingText).toBe(eventTitle);
})

test('a user can get general tickets', async ({ page }) => {
    const text = 'General Tickets';

    const firstCard = await getFirstCard(page, text);

    const [popup, navigation] = await Promise.all([
        page.waitForEvent('popup').catch(() => null),
        page.waitForURL('**').catch(() => null),
        firstCard.locator('a', { hasText: text }).click()
    ]);

    // Determine which scenario happened
    const targetPage = popup ?? page;

    const finalUrl = targetPage.url();
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).not.toBe('about:blank');
})

test('a user can get premium tickets', async ({ page }) => {
    const text = 'Premium Tickets'

    const firstPremiumCard = await getFirstCard(page, text)

    await firstPremiumCard.locator('a', { hasText: text }).click()

    const activeTab = page.locator('.tab-pane.active')
    await expect(activeTab.getByRole('link', { name: 'Contact Us' })).toBeVisible()
})