# Playwright PBR UI Automation

End-to-end UI automation tests for PBR web experiences using Playwright + TypeScript, focused on validating real user behavior and critical flows.

## Project Structure
```
playwright-ts-pbr/
├── tests/
│   ├── features/       # High-level BDD-style descriptions of expected behavior
│   ├── helpers/        # Shared utilities used across tests (i.e. navigation, assertions, helpers)
│   └── specs/          # Page-based Playwright test files
├── playwright.config.ts
└── package.json
```

Notes

- Tests are organized by page, not by component abstractions.
- Feature files describe what should happen.
- Specs define how that behavior is validated.

## Tech Stack

- **Language:** TypeScript
- **Framework:** Playwright
- **BDD-style feature files** — High-level descriptions of expected behavior
- **Helper utilities** — Shared, reusable test logic where appropriate

## Why No Page Objects?

This project intentionally does **not** use a traditional Page Object Model (POM).

While POM is a powerful and widely adopted pattern, it can introduce unnecessary abstraction and file sprawl in smaller test suites. In this project:

- Most selectors and interactions are used by a single test
- Extracting page objects would add indirection without reuse
- Inline locators make tests easier to read and reason about

This decision was made to:

- Avoid over-engineering
- Keep tests close to the user’s behavior
- Optimize for clarity and learning over abstraction

> **Note:** This is not an anti-POM stance.
> Page Objects are a preferred pattern and would be introduced if the project grows in size or reuse demands it.

## Test Philosophy

- Tests assert observable user behavior, not implementation details
- Filters and tabs are validated through data changes, not just clicks
- Stable, semantic locators are preferred over brittle selectors
- Tests focus on high-value user paths (standings, filters, navigation)

## Running Tests
```
npm install
npx playwright test
```

## Notes

This project is intentionally lightweight and iterative. Architecture choices are made to match current complexity, with room to evolve as requirements grow.