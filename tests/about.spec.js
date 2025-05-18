import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/À propos | Julien Chaumont - Software Engineer/);

    // Check if the main heading is present
    const heading = page.locator('h1.page-title');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('À propos');

    // Check if the main sections are present
    const sections = page.locator('section');
    await expect(sections).toHaveCount(4); // Work, Projects, Education, Legal

    // Check if the section headings are present
    const sectionHeadings = page.locator('section h2');
    await expect(sectionHeadings).toHaveCount(4);

    // Check specific section headings
    await expect(sectionHeadings.nth(0)).toHaveText('Travail');
    await expect(sectionHeadings.nth(1)).toHaveText('Réalisations');
    await expect(sectionHeadings.nth(2)).toHaveText('Formation');
    await expect(sectionHeadings.nth(3)).toHaveText('Mentions légales');

    // Check if there are work items
    const workItems = page.locator('section:has(h2:text("Travail")) .item');
    expect(await workItems.count()).toBeGreaterThan(0);

    // Check if there are project items
    const projectItems = page.locator('section:has(h2:text("Réalisations")) .item');
    expect(await projectItems.count()).toBeGreaterThan(0);

    // Check if there are education items
    const educationItems = page.locator('section:has(h2:text("Formation")) .item');
    expect(await educationItems.count()).toBeGreaterThan(0);

    // Check if the legal section has content
    const legalContent = page.locator('section:has(h2:text("Mentions légales")) p');
    expect(await legalContent.count()).toBeGreaterThan(0);

    // Check if the menu is present
    const menu = page.locator('nav.menu');
    await expect(menu).toBeVisible();

    // Check if the footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
