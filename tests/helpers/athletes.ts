import { expect, Page  } from '@playwright/test';
import { URLS, TIMEOUTS, SELECTORS } from './constants';

export async function openAthletesTab(page: Page, tab: 'Bulls' | 'Riders') {
  await page.goto(URLS.ATHLETES, {  // Changed from 'https://www.pbr.com/athletes'
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUTS.NAVIGATION  // Changed from 6000
  });
  
  const tabLink = page.getByRole('tab', { name: tab });
  await tabLink.click();
  return page.locator(`#${tab}`);
}

export async function getFirstAthleteCard(page: Page, tab: 'Bulls' | 'Riders') {
  const pane = await openAthletesTab(page, tab);
  const firstCard = pane.locator(SELECTORS.ATHLETE_BLOCK).first();  // Changed from '.athleteBlock'
  await expect(firstCard).toBeVisible();
  return firstCard;
}

export async function openFirstBullProfile(page: Page): Promise<void> {
  await page.goto(`${URLS.ATHLETES}#Bulls`);  // Changed from hardcoded URL

  const bullsTab = page.locator('#bull-tab');
  await expect(bullsTab).toBeVisible();
  await bullsTab.click();

  const firstBull = page.locator(`#Bulls ${SELECTORS.ATHLETE_BLOCK}`).first();  // Changed from '.athleteBlock'
  await expect(firstBull).toBeVisible();
  await firstBull.click();

  await expect(page.locator(SELECTORS.ATHLETE_HEAD)).toBeVisible();  // Changed from '.athleteHead'
}