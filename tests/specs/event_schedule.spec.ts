import { test, expect, Page, Locator } from '@playwright/test'
import { openNavLink } from '../helpers/utils'

test.setTimeout(60000)

// Configure retries for all tests in this file
test.describe.configure({ retries: 2 })

async function getFirstCard(page: Page, text: string) {
  const firstCard = page.locator('.eventScheduleItem').filter({hasText: text }).first()
  await expect(firstCard).toBeVisible({ timeout: 10000 })
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

  // Dismiss cookie banner if present
  const cookieBanner = page.locator('#onetrust-accept-btn-handler')
  if (await cookieBanner.isVisible().catch(() => false)) {
    await cookieBanner.click()
  }

  await page.locator('.eventScheduleItem').first().waitFor({ state: 'visible' })
})

test('a user can filter events', async ({ page }) => {
  const filterValue = 'UTB'
  
  await page.locator('#eventTourSelect').selectOption(filterValue);

  const utbEvents = page.locator(`.eventScheduleItem.${filterValue}`);
  await expect(utbEvents.first()).toBeVisible();
  expect(await utbEvents.count()).toBeGreaterThan(0);
})

test('a user can view event details', async ({ page }) => {
  const firstCard = await getFirstCard(page, 'Event Details')
  const eventTitle = (await firstCard.locator('h2').textContent())?.trim()
  
  await firstCard.locator('a', { hasText: 'Event Details' }).click({ force: true })
  await page.waitForURL(/.*/, { waitUntil: 'domcontentloaded', timeout: 30000 })
  
  const eventPageHeading = page.locator('h2').first()
  await expect(eventPageHeading).toBeVisible()
  
  const eventPageHeadingText = (await eventPageHeading.textContent())?.trim()
  expect(eventPageHeadingText).toBe(eventTitle)
})

test('a user can get general tickets', async ({ page }) => {
  const firstCard = await getFirstCard(page, 'General Tickets');
  const ticketLink = firstCard.locator('a', { hasText: 'General Tickets' })
  const initialPath = new URL(page.url()).pathname;

    const [popup] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
    ticketLink.click()
  ])
  
  // Check if popup opened or stayed on same page
  if (popup) {
    await popup.waitForLoadState('domcontentloaded')
    expect(popup.url()).not.toBe('about:blank')
    await popup.close()
  } else {
    await page.waitForLoadState('domcontentloaded')
    await page.waitForURL(url => url.href !== initialPath, { timeout: 10000 })
    expect(page.url()).not.toBe(initialPath) 
  }
})

test('a user can get premium tickets', async ({ page }) => {
  const firstPremiumCard = await getFirstCard(page, 'Premium Tickets')
  await firstPremiumCard.locator('a', { hasText: 'Premium Tickets' }).click()
  
  const premiumTicketTab = page.getByRole('tab', { name: 'Chute Seats' });

  // get aria-controls value from the tab
  const paneId = await premiumTicketTab.getAttribute('aria-controls');
  if (!paneId) {
    throw new Error(`No aria-controls found for Chute Seats tab`);
  }

  const pane = page.locator(`#${paneId}`);
  await expect(pane.getByRole('link', { name: 'Contact Us' })).toBeVisible();
})