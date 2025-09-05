# julienc.io

Personal website built with [Astro](https://astro.build/).

## Development

### Prerequisites

- Node.js (see .nvmrc for version)
- npm

### Installation

```bash
npm ci
```

### Development Server

```bash
npm run dev
```

This will start a development server at http://localhost:4321.

### Build

```bash
npm run build
```

This will generate a production build in the `dist` directory.

### Preview

```bash
npm run preview
```

This will serve the production build locally for preview.

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. See the [testing documentation](./tests/README.md) for more information.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests in debug mode
npm run test:debug

# Run tests with UI
npm run test:ui
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline:

1. Builds the project and checks for any errors or warnings
2. Runs the end-to-end tests against the built site
3. Uploads the test report as an artifact

The CI workflow runs on every push to the main branch and on every pull request.

You can view the workflow configuration in [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Project Structure

```
julienc.io/
├── .github/           # GitHub configuration
│   └── workflows/     # GitHub Actions workflows
├── content/           # Content files (markdown, JSON)
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components
│   ├── layouts/       # Page layouts
│   └── pages/         # Page components
└── tests/             # End-to-end tests
```

## Technologies

- [Astro](https://astro.build/) - Web framework
- [React](https://reactjs.org/) - UI components
- [Sass](https://sass-lang.com/) - Styling
- [Playwright](https://playwright.dev/) - Testing
- [GitHub Actions](https://github.com/features/actions) - CI/CD
