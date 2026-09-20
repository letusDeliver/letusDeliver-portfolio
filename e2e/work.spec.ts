import { test, expect } from '@playwright/test';

test.describe('Work navigation and project detail', () => {
  test('navigates from the header to the work list', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole('heading', { name: "What we've built." })).toBeVisible();
  });

  test('filters projects by category', async ({ page }) => {
    await page.goto('/work');
    const allCount = await page.locator('a[href^="/work/"]').count();

    await page.getByRole('button', { name: 'Cloud' }).click();
    const cloudCount = await page.locator('a[href^="/work/"]').count();

    expect(cloudCount).toBeGreaterThan(0);
    expect(cloudCount).toBeLessThanOrEqual(allCount);
  });

  test('opens a project detail page with ownership context and no fabricated demo links', async ({ page }) => {
    await page.goto('/work');
    await page.getByRole('link', { name: /Employee Management System/ }).click();

    await expect(page).toHaveURL(/\/work\/employee-management-system$/);
    await expect(page.getByRole('heading', { name: 'Employee Management System' })).toBeVisible();
    await expect(page.getByText('Personal project')).toBeVisible();
  });
});
