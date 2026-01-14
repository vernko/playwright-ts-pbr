import { test, expect, Page } from '@playwright/test';
import { normalizeName } from '../helpers/utils';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.pbr.com/athletes/riders/rookie-of-the-year/')
})

test('when a user selects a year, the rookie standings display for that year', async({ page }) => {
    await page.locator('[data-id="2013"]').waitFor()
    
    const responsePromise = page.waitForResponse(response => 
        response.url().includes('RiderROTY')
    )
    
    await page.locator('[data-id="2013"]').click()
    
    const response = await responsePromise
    expect(response.url()).toContain('season=2013')
    
    const table = page.locator('#standingsTable')
    await expect(table).toBeVisible()
})

test('a user can select a rider...', async ({ page }) => {
  const table = page.locator('#standingsTable')
  const rowOneRider = table.locator('tbody tr').first().locator('td').nth(1).locator('a')
  
  await expect(rowOneRider).toBeVisible()
  const rowOneRiderText = (await rowOneRider.innerText()).trim()
  
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
    rowOneRider.click()
  ])
  
  const targetPage = newPage || page
  await targetPage.locator('.athlete-head').waitFor({ timeout: 30000 })
  const riderName = await targetPage.locator('.rider-name-custom').innerText()
  expect(rowOneRiderText).toBe(normalizeName(riderName))
  
  if (newPage) await newPage.close()
})