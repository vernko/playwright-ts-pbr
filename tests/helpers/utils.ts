import { Page, expect } from '@playwright/test';

export async function openNavLink(
    page: Page,
    button: string,
    link: string,
    newUrl: string,
    title: string
) {
    const URL = 'https://pbr.com'
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })

    const navButton = page.getByRole('button', { name: button })
    await expect(navButton).toBeVisible({ timeout: 15000 })
    await navButton.click()

    const navLink = page.getByRole('link', { name: link })
    await expect(navLink).toBeVisible({ timeout: 15000 })
    await navLink.click()

    await expect(page).toHaveURL(new RegExp(`/${newUrl}(\\?|/|$)`), { timeout: 15000 })
    await expect(page).toHaveTitle(title, { timeout: 15000 })
}

export function normalizeName(cardName: string) {
    const normalizedCardName = cardName.split(/\s+/) // split on whitespace
        .filter(Boolean)  // remove empty strings
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) // Proper-case
        .join(' ');

    return normalizedCardName;
}