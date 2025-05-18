import { test, expect } from '@playwright/test';

test.describe('Blog page', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to the blog page
    await page.goto('/blog');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Blog | Julien Chaumont - Software Engineer/);

    // Check if the main heading is present
    const heading = page.locator('h1.page-title');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Blog');

    // Check if there are blog articles
    const blogItems = page.locator('.item');
    expect(await blogItems.count()).toBeGreaterThan(0);

    // Check the structure of the first blog article
    const firstBlogItem = blogItems.first();

    // Check if the title is present and is a link
    const title = firstBlogItem.locator('h3 a');
    await expect(title).toBeVisible();
    await expect(title).toHaveAttribute('href', /^\/blog\//);

    // Check if the metadata list is present
    const metadataList = firstBlogItem.locator('ul');
    await expect(metadataList).toBeVisible();

    // Check if the date is present
    const dateItem = firstBlogItem.locator('ul li:has(svg)').first();
    await expect(dateItem).toBeVisible();

    // Check if the tags are present
    const tagsItem = firstBlogItem.locator('ul li:has(svg)').nth(1);
    await expect(tagsItem).toBeVisible();

    // Check if the menu is present
    const menu = page.locator('nav.menu');
    await expect(menu).toBeVisible();

    // Check if the footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Test navigation to a blog article
    await title.click();

    // Check if we've navigated to a blog article page
    await expect(page).toHaveURL(/^http:\/\/localhost:4321\/blog\//);

    // Check if the article page has loaded
    await expect(page.locator('.article')).toBeVisible();
  });
});
