# Copilot Instructions for practicas-playwrigth

## Project Overview
This project is an automated testing suite for the SauceDemo web application, using Playwright with TypeScript. All tests are located in the `tests/` directory and are designed to validate login, product management, cart, checkout, and product detail functionalities.

## Key Components
- **playwright.config.ts**: Main Playwright configuration file. Adjusts test runner settings, browser options, and reporting.
- **tests/**: Contains all test specs (e.g., `example.spec.ts`, `practica.spec.ts`). Each file groups related end-to-end scenarios.
- **playwright-report/** and **test-results/**: Output directories for Playwright's HTML reports and raw test results.

## Developer Workflows
- **Run all tests:**
  ```shell
  npx playwright test
  ```
- **Run a specific test file:**
  ```shell
  npx playwright test tests/practica.spec.ts
  ```
- **View HTML report:**
  ```shell
  npx playwright show-report
  ```
- **Debug a test:**
  Use `npx playwright test --debug` or add `test.only` to focus on a single scenario.

## Project Conventions
- Use Playwright's `test` and `expect` for all assertions and test structure.
- Prefer CSS selectors for element targeting, but XPath is used for some login fields (see `practica.spec.ts`).
- Group related steps with comments for clarity (e.g., login, cart, checkout).
- Use `allTextContents()` to capture lists of product names, descriptions, and prices, then iterate with a single `for` loop for combined output.
- Spanish is used for test names and comments.

## Patterns and Examples
- **Login Example:**
  ```typescript
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);
  ```
- **Iterate product details:**
  ```typescript
  for (let i = 0; i < item_name.length; i++) {
    console.log(`Producto ${i + 1}:`);
    console.log('  Nombre:', item_name[i]);
    console.log('  Descripción:', item_desc[i]);
    console.log('  Precio:', item_price[i]);
  }
  ```

## External Dependencies
- Playwright (see `package.json` for version)
- No custom helpers or service layers; all logic is in test files

## Recommendations for AI Agents
- Follow the structure and conventions in `tests/practica.spec.ts` for new scenarios.
- Use Spanish for test descriptions and comments.
- Keep test steps explicit and grouped by user flow.
- Reference Playwright documentation for advanced usage: https://playwright.dev/
