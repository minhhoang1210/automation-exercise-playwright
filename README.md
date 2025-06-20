# 🎭 Playwright Automation Project

This project is a test automation framework built using Playwright. It demonstrates E2E and API testing capabilities for the website [Automation Exercise](https://automationexercise.com) with scalable and maintainable architecture.

## 🔧 Tech Stack

- Playwright
- TypeScript
- HTML Report
- GitHub Actions
- Docker

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

## 🧪 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run API Tests

```bash
npx playwright test tests/api
```

### Run E2E Tests

```bash
npx playwright test tests/e2e
```

### View Report

```bash
npx playwright show-report
```

## 🧰 Other Commands

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

## 🐳 Using Docker

### Build Container

```bash
docker-compose up --build
```

### Run Tests

Replace [container_name] with your actual container name and [test_command] with the command you want to run (e.g. `npx playwright test`).

```bash
docker exec -it [container_name] [test_command]
```

### View report

Serve the report in your browser:

```bash
docker exec -it [container_name] npx playwright show-report --host 0.0.0.0
```

Open in your browser:

```
http://localhost:9323
```
