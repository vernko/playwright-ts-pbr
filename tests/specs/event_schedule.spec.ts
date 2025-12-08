import { test, expect, Page, Locator } from '@playwright/test'

async function countHidden(locator: Locator) {
  return locator.evaluateAll(items =>
    items.filter(el => {
      const style = window.getComputedStyle(el);
      return (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0'
      )
    }).length
  )
}

async function countVisible(locator: Locator) {
  return locator.evaluateAll(items =>
    items.filter(el => {
      const style = window.getComputedStyle(el)
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      )
    }).length
  )
}

async function getFirstCard(page: Page, text: string) {
  const firstCard = await page.locator('.eventScheduleItem').filter({hasText: text }).first()
  await firstCard.scrollIntoViewIfNeeded()
  await expect(firstCard).toBeVisible()
  return firstCard
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://pbr.com', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Schedule'}).click()
  await page.getByRole('link', { name: 'Event Schedule'}).click()
})

test('a user can filter events', async ({ page }) => {
  const filterValue = 'UTB'

  const nonMatchingItems = await page.locator(`.eventScheduleItem:not(.${filterValue})`)
  const nonMatchingItemsCount = await nonMatchingItems.count()
  
  await page.locator('#eventTourSelect.form-select').selectOption(filterValue)
  
  const matchingItems = await page.locator(`.eventScheduleItem.${filterValue}`)
  await expect(matchingItems.first()).toBeVisible()

  await expect(async () => {
    const visible = await countVisible(nonMatchingItems)
    expect(visible).toBe(0)
  }).toPass({ timeout: 100000, intervals: [200] })

  const matchingHidden = await countHidden(matchingItems)
  const nonMatchingHidden = await countHidden(nonMatchingItems)
  const nonMatchingVisible = await countVisible(nonMatchingItems)
  
  expect(matchingHidden).toBe(0)
  expect(nonMatchingHidden).toBe(nonMatchingItemsCount)
  expect(nonMatchingVisible).toBe(0)
  expect(nonMatchingItemsCount).toBeGreaterThan(0)
})

test('a user can view event details', async ({ page }) => {
  const text = 'Event Details';
  const firstCard = await getFirstCard(page, text);
  const eventTitle = await firstCard.locator('h2').textContent()
  
  await firstCard.locator('a', { hasText: text }).click()
  
  const eventPageHeading = page.locator('h2', { hasText: eventTitle || '' })
  await expect(eventPageHeading).toBeVisible({ timeout: 10000 })
  
  const eventPageHeadingText = await eventPageHeading.textContent()
  expect(eventPageHeadingText).toBe(eventTitle)
})

test('a user can get general tickets', async ({ page }) => {
  const text = 'General Tickets';
  const firstCard = await getFirstCard(page, text)
  
  const [popup] = await Promise.all([
    page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
    firstCard.locator('a', { hasText: text }).click()
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
  
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
    firstPremiumCard.locator('a', { hasText: text }).click()
  ])

  const targetPage = newPage || page
  
  const activeTab = targetPage.locator('.tab-pane.active')
  await expect(activeTab.getByRole('link', { name: 'Contact Us' })).toBeVisible({ timeout: 10000 })

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