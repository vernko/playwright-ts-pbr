import { test, expect, Page, Locator } from '@playwright/test';
import { normalizeName } from '../helpers/utils';

let yearDropdown: Locator;

export async function getTopBullScores(page: Page, count: number) {
  await expect(page.locator('#standingsTable')).toBeVisible()
  const scoreColumn = page.locator('#standingsTable tbody tr td:nth-child(3)')
  const allScores = await scoreColumn.allTextContents()
  return allScores.slice(0, count)
}

export async function selectTour(page: Page, year: string, tourId: string) {
  const tourLink = page
    .locator(`.seasonLink[data-id="${tourId}"]`)
    .filter({ has: page.locator(`.SCD-${year}`) })
    .first()
  
  await expect(tourLink).toBeVisible()
  await tourLink.click()
}

async function expectTopBullCardMatchesTable(page: Page) {
  const cardBull = page.locator('.standingsTop3').first().locator('.info h3').nth(1)
  const tableBull = page.locator('tbody tr').first().locator('td').nth(1).locator('a');

  await expect(cardBull).toBeVisible()
  await expect(tableBull).toBeVisible()
  
  const cardName = normalizeName(await cardBull.innerText())
  const tableName = normalizeName(await tableBull.innerText())

  expect(cardName).toBe(tableName)
}

async function verifyScoresChanged(page: Page, scoresBefore: string[]) {
  await expect.poll(async () => {
    const scoresAfter = await getTopBullScores(page, 5)
    return scoresAfter.join('|')
  }).not.toBe(scoresBefore.join('|'))
}

test.beforeEach(async ({ page }) => {
  yearDropdown = page.locator('#standingsSelect')
  await page.goto('https://www.pbr.com/athletes/bulls/standings/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  })

  await page.locator('#standingsTable').first().waitFor({ state: 'visible', timeout: 15000 })
});

test('default standings show consistent top bull', async ({ page }) => {
  await expect(yearDropdown).toHaveValue('2026')
  await expect(page.getByRole('link', { name: 'Unleash the Beast' })).toBeVisible()

  await expectTopBullCardMatchesTable(page)
})

test('displays bull standings for the selected year', async ({ page }) => {
  const scoresBefore = await getTopBullScores(page, 5)
  const selectedYear = '2020'
  const tourId = 'PBR-US'

  await yearDropdown.selectOption(selectedYear)

  await selectTour(page, selectedYear, tourId)

  await verifyScoresChanged(page, scoresBefore)
});

test('displays bull standings for the selected tour', async ({ page }) => {
  const selectedYear = '2020'
  const tourId1 = 'PBR-US'
  const tourId2 = 'VELO'

  await yearDropdown.selectOption(selectedYear)

  await selectTour(page, selectedYear, tourId1)

  const scoresBefore = await getTopBullScores(page, 5)

  await selectTour(page, selectedYear, tourId2)

  await verifyScoresChanged(page, scoresBefore)
});
