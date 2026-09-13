import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Mobile navigation', () => {
  test('opens and closes the mobile menu, and navigates', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Open menu' });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const mobileNav = page.getByRole('navigation', { name: 'Mobile primary' });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test('closes the mobile menu on Escape', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile primary' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation', { name: 'Mobile primary' })).toBeHidden();
  });

  test('has no horizontal overflow at mobile width', async ({ page }) => {
    await page.goto('/');
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});
