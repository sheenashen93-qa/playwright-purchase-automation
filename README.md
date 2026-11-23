# Playwright Purchase Automation

An automated testing project for a demo e-commerce application built with
Playwright Test and TypeScript. The project uses the Page Object Model (POM)
to organize UI interactions and Jenkins to run UI tests and publish results.

## Test Coverage

| Suite | Coverage |
| --- | --- |
| UI tests | Sign-in with valid and invalid credentials, product search, sorting products by price, and adding or removing favorites. |
| API tests | User and product endpoints. |
| End-to-end purchase tests | Sign in, search for a product, add it to the cart, and complete checkout. Test-scoped fixtures create a user and a product through the API before each test that uses them and delete both during teardown. |
| API response mocking | Modify a product API response and verify that the UI displays the modified data. Simulate an HTTP 500 response and verify how the UI handles the error. |

## Tech Stack

- Playwright Test and TypeScript
- Node.js and npm
- Jenkins for continuous integration
- JUnit XML for test reporting

## Getting Started

Use Node.js 24 to match the Jenkins environment.

```bash
git clone https://github.com/sheenashen93-qa/playwright-purchase-automation.git
cd playwright-purchase-automation
npm ci
npx playwright install chromium
```

## Running Tests

### UI Tests

```bash
npx playwright test "tests/UI" --project=chromium --reporter=list,junit
```

### API Tests

```bash
npx playwright test "tests/API" --reporter=list,junit
```

### End-to-End Purchase Tests

```bash
npx playwright test "tests/WorkFlow" --project=chromium --reporter=list,junit
```

## Jenkins Pipeline

The pipeline checks out the repository, installs project dependencies and
Chromium, runs the UI suite, and publishes the JUnit XML results in Jenkins.