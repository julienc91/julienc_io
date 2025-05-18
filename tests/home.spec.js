import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Julien Chaumont - Software Engineer/);

    // Check if the main heading is present
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Julien Chaumont');

    // Check if the subtitle is present
    const subtitle = page.locator('h2');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toHaveText('Software Engineer');

    // Check if the red text is present
    const redText = page.locator('.red-text');
    await expect(redText).toBeVisible();
    await expect(redText).toHaveText('//');

    // Check if the menu is present
    const menu = page.locator('nav.menu');
    await expect(menu).toBeVisible();

    // Check if the menu links are present
    const menuLinks = page.locator('nav.menu a');
    await expect(menuLinks).toHaveCount(4); // Home, About, Blog, Contact

    // Check if the footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
