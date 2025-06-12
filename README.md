# 🎭 Playwright Automation Project

This project is a test automation framework built using Playwright. It demonstrates E2E and API testing capabilities for the website [Automation Exercise](https://automationexercise.com) with scalable and maintainable architecture.

## 🔧 Tech Stack

- Playwright
- TypesScript
- HTML Report
- GitHub Actions

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/minhhoang1210/automation-exercise-playwright.git
```

### Environment Setup

Create a `.env` file in the root of the project with the following variables:

```bash
BASE_URL=https://automationexercise.com
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers
```bash
npx playwright install
```

### Run Tests

- All tests
```bash
npx playwright test
```

- API tests
```bash
npx playwright test tests/api
```

- E2E tests
```bash
npx playwright test tests/e2e
```

### Generate and View Report

```bash
npx playwright show-report
```

## 🧰 Useful Commands

### Run with UI Mode

```bash
npx playwright test --ui
```

### Run in Headed Mode
```bash
npx playwright test --headed
```

### Debug
```bash
npx playwright test --debug
```