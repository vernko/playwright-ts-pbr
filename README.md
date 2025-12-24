# playwright-ts-pbr

## Purpose
This project automates UI tests for [pbr.com](https://www.pbr.com/) using TypeScript and Playwright.

## Prerequisites
Before you begin, ensure you have:
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git

## Tech Stack

**Language:** TypeScript

**Framework:** Playwright

**Design Pattern:** Page Object Model (POM) - see [Understanding POM](#page-object-model) below

## Getting Started

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/vernko/playwright-ts-pbr.git
```
   *Or fork the repository and clone your fork*

2. Navigate to the project directory:
```bash
   cd playwright-ts-pbr
```

3. Install dependencies:
```bash
   npm install
```

4. Install Playwright browsers:
```bash
   npx playwright install
```

5. Open the project in your preferred code editor (VS Code recommended)

## Project Structure
```
playwright-ts-pbr/
├── tests/
│   ├── helpers/        # Shared utility functions
│   ├── pages/          # Page Object Models
│   └── specs/          # Test specifications
├── playwright.config.ts
└── package.json
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Specific Test File
```bash
npx playwright test standings.spec.ts
```

### Run in Headed Mode
```bash
npx playwright test --headed
```

### Run in UI Mode
```bash
npx playwright test --ui
```

### Run from IDE
1. Open the spec file containing your test
2. Find the test function you want to run
3. Click the play button next to the test

For more command line options, see [Playwright's CLI documentation](https://playwright.dev/docs/test-cli).

## Writing Tests

### Naming Conventions
- **Functions:** camelCase (e.g., `clickLoginButton`)
- **Spec files:** `page_name.spec.ts` (e.g., `standings.spec.ts`, `mvp_race.spec.ts`)

### Test Structure

Each test should include:
- **Descriptive name** - clearly states what is being tested
- **Test data** - any data needed for validation
- **Test steps** - clear, descriptive actions (using Page Object methods)
- **Assertions** - validation that the test behaves as expected

### Common Assertions

Playwright provides various assertion methods including:
- `toBeVisible()` - element is visible on the page
- `toContain()` - text/array contains a value
- `toBe()` - exact value match
- `toHaveText()` - element has specific text

### Creating a New Test

**If the test relates to existing tests:**
Add it to the existing spec file for that page.

**If the test is for a new page or feature:**
1. Navigate to `tests/specs`
2. Create a new spec file: `page_name.spec.ts`
3. Write your test using the structure above

**Example:**
```typescript
test('a user can select a rider from the standings and view their page', async ({ page }) => {
  // Navigate to standings page
  await standingsPage.goto()
  
  // Select first rider
  const riderName = await standingsPage.selectFirstRider()
  
  // Verify rider page displays
  await expect(riderPage.heading).toHaveText(riderName)
})
```

## Page Object Model

### What is POM?

The Page Object Model is a design pattern that creates an object repository for web elements. Each page of the application has a corresponding Page Object class.

### Organization

Page Objects are located in `tests/pages/`. Each page gets its own class containing:
- **Locators** - selectors for page elements
- **Actions** - methods for interacting with the page (clicks, inputs, etc.)

### Method Organization

Methods are organized using a hybrid approach:
- **No related functionality:** Alphabetical order
- **Related functionality:** Order of occurrence/workflow

For more details, see [BrowserStack's POM Guide](https://www.browserstack.com/guide/page-object-model-in-selenium).

## Best Practices

- ✅ Use descriptive test names that explain what is being tested
- ✅ Keep tests independent - each test should run in isolation
- ✅ Use proper waits - rely on Playwright's auto-waiting instead of hard timeouts
- ✅ Add retries for genuinely flaky tests when needed
- ✅ Keep Page Objects focused on a single page
- ✅ Use helper functions for repeated logic

## Troubleshooting

**Tests timing out?**
- Increase timeout in `playwright.config.ts`
- Check if you're waiting for the right conditions

**Flaky tests?**
- Review retry configuration
- Ensure proper waits are in place
- Check for race conditions

**Browser issues?**
- Run `npx playwright install --force` to reinstall browsers
- Ensure you're using compatible Node.js version

## Additional Resources

### Playwright Documentation
- [Official Playwright Docs](https://playwright.dev)
- [Test Automation University - Playwright Path](https://testautomationu.applitools.com/learningpaths.html?id=playwright-path)

### Page Object Model
- [BrowserStack POM Guide](https://www.browserstack.com/guide/page-object-model-in-selenium)

## Contributing

Contributions are welcome! Please ensure:
- Tests follow the naming conventions
- Code follows the project structure
- All tests pass before submitting a PR