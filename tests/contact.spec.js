import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to the contact page
    await page.goto('/contact');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Contact | Julien Chaumont - Software Engineer/);

    // Check if the main heading is present
    const heading = page.locator('h1.page-title');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Contact');

    // Check if the contact list is present
    const contactList = page.locator('ul');
    await expect(contactList).toBeVisible();

    // Check if there are 6 contact methods
    const contactItems = page.locator('ul > li');
    await expect(contactItems).toHaveCount(6);

    // Check if the email is present
    const emailItem = page.locator('li:has(.email)');
    await expect(emailItem).toBeVisible();

    // Check if the GitHub link is present and has the correct URL
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/julienc91/');
    await expect(githubLink).toHaveText('julienc91');

    // Check if the Stack Overflow link is present and has the correct URL
    const stackOverflowLink = page.locator('a[href*="stackoverflow.com"]');
    await expect(stackOverflowLink).toBeVisible();
    await expect(stackOverflowLink).toHaveAttribute('href', 'https://stackoverflow.com/users/2679935/julienc');
    await expect(stackOverflowLink).toHaveText('julienc');

    // Check if the LinkedIn link is present and has the correct URL
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/julien-chaumont/');
    await expect(linkedinLink).toHaveText('julien-chaumont');

    // Check if the Mastodon link is present and has the correct URL
    const mastodonLink = page.locator('a[href*="piaille.fr"]');
    await expect(mastodonLink).toBeVisible();
    await expect(mastodonLink).toHaveAttribute('href', 'https://piaille.fr/@julien');
    await expect(mastodonLink).toHaveText('@julien@piaille.fr');

    // Check if the PGP key link is present and has the correct URL
    const pgpLink = page.locator('a[href="/julienc.asc"]');
    await expect(pgpLink).toBeVisible();
    await expect(pgpLink).toHaveAttribute('href', '/julienc.asc');

    // Check if the menu is present
    const menu = page.locator('nav.menu');
    await expect(menu).toBeVisible();

    // Check if the footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
