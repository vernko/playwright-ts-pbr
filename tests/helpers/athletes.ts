import { expect, Page  } from '@playwright/test';
import { URLS, TIMEOUTS, SELECTORS } from './constants';

export async function openAthletesTab(page: Page, tab: 'Bulls' | 'Riders') {
  await page.goto(URLS.ATHLETES, {  // Changed from 'https://www.pbr.com/athletes'
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUTS.NAVIGATION  // Changed from 6000
  });
  
  const tabLink = page.getByRole('tab', { name: tab });
  await tabLink.click();

  const activePane = page.locator('.tab-pane.active');
  await expect(activePane).toBeVisible();

  return activePane;
}

export async function getFirstAthleteCard(page: Page, tab: 'Bulls' | 'Riders') {
  const pane = await openAthletesTab(page, tab);
  const firstCard = pane.locator(SELECTORS.ATHLETE_BLOCK).first();  // Changed from '.athleteBlock'
  await expect(firstCard).toBeVisible();
  return firstCard;
}

/**
 * Opens the profile page of the first athlete card in the specified tab.
 * @param page - Playwright Page object
 * @param tab - Either 'Bulls' or 'Riders'
 */
export async function openFirstAthleteProfile(page: Page, tab: 'Bulls' | 'Riders'): Promise<void> {
  const firstCard = await getFirstAthleteCard(page, tab);
  await firstCard.click();
}