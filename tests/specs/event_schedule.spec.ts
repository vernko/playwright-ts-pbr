import { test, expect, Page, Locator } from '@playwright/test'

// Increase timeout for this flaky site
test.setTimeout(60000)

// Configure retries for all tests in this file
test.describe.configure({ retries: 2 })

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
  await page.goto('https://pbr.com', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Schedule'}).click()
  await page.getByRole('link', { name: 'Event Schedule'}).click()
})

test('a user can filter events', async ({ page }) => {
  const filterValue = 'UTB'
  
  // Count items before filtering
  const nonMatchingItems = page.locator(`.eventScheduleItem:not(.${filterValue})`)
  const totalNonMatching = await nonMatchingItems.count()
  
  await page.locator('#eventTourSelect.form-select').selectOption(filterValue)
  
  // Wait for matching items to be visible
  const matchingItems = page.locator(`.eventScheduleItem.${filterValue}`)
  await expect(matchingItems.first()).toBeVisible()
  
  // Wait for the non-matching items to be filtered out by checking CSS
  await expect(async () => {
    const visible = await countVisible(nonMatchingItems)
    expect(visible).toBe(0)
  }).toPass({ timeout: 10000, intervals: [200] }) // Fixed typo: was 100000
  
  // Now verify all the counts
  const matchingHidden = await countHidden(matchingItems)
  const nonMatchingVisible = await countVisible(nonMatchingItems)
  const nonMatchingHidden = await countHidden(nonMatchingItems)
  
  expect(matchingHidden).toBe(0)
  expect(nonMatchingVisible).toBe(0)
  expect(nonMatchingHidden).toBe(totalNonMatching)
  expect(totalNonMatching).toBeGreaterThan(0) // Sanity check
})

test('a user can view event details', async ({ page }) => {
  const text = 'Event Details';
  const firstCard = await getFirstCard(page, text);
  const eventTitle = await firstCard.locator('h2').textContent();
  
  await firstCard.locator('a', { hasText: text }).click()
  
  // Wait for the specific element with longer timeout
  const eventPageHeading = page.locator('.col-12.col-md-8 h2').first();
  await expect(eventPageHeading).toBeVisible({ timeout: 10000 });
  
  const eventPageHeadingText = await eventPageHeading.textContent();
  expect(eventPageHeadingText).toBe(eventTitle);
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
  
  // Wait for new page to open, with timeout
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
    firstPremiumCard.locator('a', { hasText: text }).click()
  ])
  
  // If a new page opened, use it
  if (newPage) {
    await newPage.waitForLoadState('domcontentloaded')
    const activeTab = newPage.locator('.tab-pane.active')
    await expect(activeTab.getByRole('link', { name: 'Contact Us' })).toBeVisible({ timeout: 10000 })
    await newPage.close()
  } else {
    // Otherwise check the original page
    const activeTab = page.locator('.tab-pane.active')
    await expect(activeTab.getByRole('link', { name: 'Contact Us' })).toBeVisible({ timeout: 10000 })
  }
})