import { Page, expect, Locator } from '@playwright/test';
import { BASE_URL, TIMEOUTS } from './constants';

export async function clickAndWaitForPopup(
  page: Page,
  clickAction: Promise<unknown>,
  timeout = TIMEOUTS.MEDIUM
) {
  const [popup] = await Promise.all([
    page.waitForEvent('popup', { timeout }),
    clickAction
  ])

  await popup.waitForLoadState('domcontentloaded')
  return popup
}

export function normalizeName(cardName: string | null): string {
  if (!cardName) return '';

  return cardName
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export async function openNavLink(
    page: Page,
    button: string,
    link: string,
    newUrl: string,
    title: string
) {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION })

    const navButton = page.getByRole('button', { name: button })
    await expect(navButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
    await navButton.click()

    const navLink = page.getByRole('link', { name: link })
    await expect(navLink).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
    await navLink.click()

    await expect(page).toHaveURL(new RegExp(`/${newUrl}(\\?|/|$)`), { timeout: TIMEOUTS.MEDIUM })
    await expect(page).toHaveTitle(title, { timeout: TIMEOUTS.MEDIUM })
}