import { expect, Page  } from '@playwright/test';

export async function openAthletesTab(page: Page, tab: 'Bulls' | 'Riders') {
  await page.goto('https://www.pbr.com/athletes', { 
    waitUntil: 'domcontentloaded',
    timeout: 6000
  });
  
  const tabLink = page.getByRole('tab', { name: tab });
  await tabLink.click();
  return page.locator(`#${tab}`);
}

export async function getFirstAthleteCard(page: Page, tab: 'Bulls' | 'Riders') {
  const pane = await openAthletesTab(page, tab);
  const firstCard = pane.locator('.athleteBlock').first();
  await expect(firstCard).toBeVisible();
  return firstCard;
}

export async function openFirstBullProfile(page: Page): Promise<void> {
  await page.goto('https://www.pbr.com/athletes#Bulls');

  const bullsTab = page.locator('#bull-tab');
  await expect(bullsTab).toBeVisible();
  await bullsTab.click();

  const firstBull = page.locator('#Bulls .athleteBlock').first();
  await expect(firstBull).toBeVisible();
  await firstBull.click();

  await expect(page.locator('.athleteHead')).toBeVisible();
}