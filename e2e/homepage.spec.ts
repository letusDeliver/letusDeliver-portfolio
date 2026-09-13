import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders the hero, primary CTA and key sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Think\. Build\./ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start a Project →' }).first()).toBeVisible();

    await expect(page.getByRole('heading', { name: "What we've built." })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Two engineers. One mission.' })).toBeVisible();
  });

  test('primary CTA navigates to the start-a-project page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Start a Project →' }).first().click();
    await expect(page).toHaveURL(/\/start-a-project$/);
    await expect(page.getByRole('heading', { name: "Let's build something." })).toBeVisible();
  });

  test('has no client-side console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});
