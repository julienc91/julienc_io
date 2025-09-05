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
npm ci
```

### Install Playwright Browsers

If this is your first time running Playwright, you need to install the browsers:

```bash
npx playwright install
```

### Running All Tests

To run all tests in all configured browsers (Chromium, Firefox, WebKit, and mobile browsers):

```bash
npm test
```

### Running Tests in a Specific Browser

To run tests only in a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Running Tests in Debug Mode

To run tests in debug mode, which allows you to step through the tests:

```bash
npm run test:debug
```

### Running Tests with UI

To run tests with the Playwright UI, which provides a visual interface for test execution:

```bash
npm run test:ui
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

These tests are integrated into the project's CI/CD pipeline using GitHub Actions. The workflow:

1. Builds the project
2. Starts the preview server
3. Runs the Playwright tests against the built site
4. Uploads the test report as an artifact

In the CI environment, only the Chromium tests are run to save time. The configuration is set up to handle CI environments with the `process.env.CI` variable, which adjusts settings like retries and parallelism.

You can view the workflow configuration in [.github/workflows/ci.yml](../.github/workflows/ci.yml).
