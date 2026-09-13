import { test, expect } from '@playwright/test';

test.describe('Start a Project form', () => {
  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.goto('/start-a-project');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Start the Conversation →' }).click();

    await expect(page.getByText('Please enter your name.')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/start-a-project');
    await page.waitForLoadState('networkidle');

    await page.locator('#name').fill('Jane Doe');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#projectType').selectOption('Web application');
    await page.locator('#timeline').selectOption('1–3 months');
    await page.locator('#projectDescription').fill('We need a customer portal with self-serve onboarding and billing.');

    await page.getByRole('button', { name: 'Start the Conversation →' }).click();

    await expect(page.getByText('Message delivered.')).toBeVisible();
    await expect(page.getByText("Thanks for reaching out.")).toBeVisible();
  });

  test('is keyboard accessible end to end', async ({ page }) => {
    await page.goto('/start-a-project');

    await page.locator('#name').click();
    await page.keyboard.type('Jane Doe');
    await page.keyboard.press('Tab');
    await page.keyboard.type('jane@example.com');

    await expect(page.locator('#email')).toBeFocused();
  });
});
