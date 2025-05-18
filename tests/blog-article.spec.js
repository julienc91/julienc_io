import { test, expect } from '@playwright/test';

test.describe('Blog article page', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to the blog page first
    await page.goto('/blog');

    // Get the first blog article link
    const firstArticleLink = page.locator('.item h3 a').first();
    const articleTitle = await firstArticleLink.textContent();

    // Click on the first article
    await firstArticleLink.click();

    // Check if we've navigated to the article page
    await expect(page).toHaveURL(/^http:\/\/localhost:4321\/blog\//);

    // Check if the page title contains the article title
    await expect(page).toHaveTitle(new RegExp(`${articleTitle} | Julien Chaumont - Software Engineer`));

    // Check if the article container is present
    const articleContainer = page.locator('.article');
    await expect(articleContainer).toBeVisible();

    // Check if the article title is present
    const heading = page.locator('h1.page-title');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(articleTitle);

    // Check if the metadata is present
    const metadata = page.locator('.metadata');
    await expect(metadata).toBeVisible();

    // Check if the date is present
    const dateItem = page.locator('.metadata li:has(svg)').first();
    await expect(dateItem).toBeVisible();

    // Check if the tags are present
    const tagsItem = page.locator('.metadata li:has(svg)').nth(1);
    await expect(tagsItem).toBeVisible();

    // Check if the article content is present
    const articleContent = page.locator('.article-content');
    await expect(articleContent).toBeVisible();

    // Check if the "read next" section is present
    const readNextSection = page.locator('.article-others');
    await expect(readNextSection).toBeVisible();

    // Check if the "read next" heading is present
    const readNextHeading = readNextSection.locator('h3');
    await expect(readNextHeading).toBeVisible();
    await expect(readNextHeading).toHaveText('À lire ensuite');

    // Check if there are other article links
    const otherArticleLinks = readNextSection.locator('li a');
    expect(await otherArticleLinks.count()).toBeGreaterThan(0);

    // Check if the menu is present
    const menu = page.locator('nav.menu');
    await expect(menu).toBeVisible();

    // Check if the footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
