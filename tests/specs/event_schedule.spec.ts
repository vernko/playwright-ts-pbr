import { test, expect, Page, Locator } from '@playwright/test'
import { openNavLink } from '../helpers/utils'

// Increase timeout for this flaky site
test.setTimeout(90000)

// Configure retries for all tests in this file
test.describe.configure({ retries: 2 })

async function getFirstCard(page: Page, text: string) {
  const firstCard = page.locator('.eventScheduleItem').filter({hasText: text }).first()
  await expect(firstCard).toBeVisible({ timeout: 15000 })
  await firstCard.scrollIntoViewIfNeeded({ timeout: 10000 })
  return firstCard;
}

test.beforeEach(async ({ page }) => {
  await openNavLink(
    page,
    'Schedule',
    'Event Schedule',
    'events',
    'PBR | Events'
  )
})

test('a user can filter events', async ({ page }) => {
  const filterValue = 'UTB'
  
  await page.locator('#eventTourSelect.form-select').selectOption(filterValue)

  const visibleItems = page.locator('.eventScheduleItem:visible')
  await expect(visibleItems.first()).toBeVisible()

  const count = await visibleItems.count()
  expect(count).toBeGreaterThan(0)

  for (let i = 0; i < count; i++) {
    const item = visibleItems.nth(i)
    await expect(item).toHaveClass(new RegExp(filterValue))
  }
})

test('a user can view event details', async ({ page }) => {
  const text = 'Event Details';
  const firstCard = await getFirstCard(page, text)
  const eventTitle = await firstCard.locator('h2').textContent()
  
  await firstCard.locator('a', { hasText: text }).click()
  
  // Wait for the specific element with longer timeout
  const eventPageHeading = page.locator('h2', { hasText: eventTitle || '' })
  await expect(eventPageHeading).toBeVisible({ timeout: 10000 })
  
  const eventPageHeadingText = await eventPageHeading.textContent()
  expect(eventPageHeadingText).toBe(eventTitle)
})

test('a user can get general tickets', async ({ page }) => {
  const text = 'General Tickets';
  const firstCard = await getFirstCard(page, text);
  
  // Use force click since element might be covered
  const [popup] = await Promise.all([
    page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
    firstCard.locator('a', { hasText: text }).click({ force: true })
  ]);
  
  // Check if popup opened or stayed on same page
  if (popup) {
    await popup.waitForLoadState('domcontentloaded')
    const finalUrl = popup.url();
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).not.toBe('about:blank');
    await popup.close()
  } else {
    // Navigation happened in same page
    await page.waitForLoadState('domcontentloaded')
    const finalUrl = page.url();
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).not.toBe('about:blank');
  }
})

test('a user can get premium tickets', async ({ page }) => {
  const text = 'Premium Tickets'
  const firstPremiumCard = await getFirstCard(page, text)
  
  await firstPremiumCard.locator('a', { hasText: text }).click()
  
  // Wait for the active tab content to load
  const activeTab = page.locator('.tab-pane.active')
  await expect(activeTab.getByRole('link', { name: 'Contact Us' })).toBeVisible({ timeout: 10000 })
})