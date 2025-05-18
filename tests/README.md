# End-to-End Testing with Playwright

This directory contains end-to-end tests for the website using [Playwright](https://playwright.dev/).

## Test Structure

The tests are organized by page:

- `home.spec.js`: Tests for the home page
- `about.spec.js`: Tests for the about page
- `blog.spec.js`: Tests for the blog page
- `blog-article.spec.js`: Tests for individual blog article pages
- `contact.spec.js`: Tests for the contact page

## Running Tests

Before running the tests, make sure you have installed the dependencies:

```bash
yarn install
```

### Install Playwright Browsers

If this is your first time running Playwright, you need to install the browsers:

```bash
npx playwright install
```

### Running All Tests

To run all tests in all configured browsers (Chromium, Firefox, WebKit, and mobile browsers):

```bash
yarn test
```

### Running Tests in a Specific Browser

To run tests only in a specific browser:

```bash
yarn test:chromium
yarn test:firefox
yarn test:webkit
```

### Running Tests in Debug Mode

To run tests in debug mode, which allows you to step through the tests:

```bash
yarn test:debug
```

### Running Tests with UI

To run tests with the Playwright UI, which provides a visual interface for test execution:

```bash
yarn test:ui
```

## Configuration

The Playwright configuration is in `playwright.config.js` in the root directory. It includes:

- Browser configurations
- Viewport sizes
- Timeouts
- Web server configuration

## Test Reports

After running the tests, Playwright generates an HTML report in the `playwright-report` directory. You can view it by opening `playwright-report/index.html` in your browser.

## Continuous Integration

These tests can be integrated into a CI/CD pipeline. The configuration is set up to handle CI environments with the `process.env.CI` variable.
