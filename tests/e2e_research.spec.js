const { test, expect } = require('@playwright/test');

test('Research tab loads and updates title', async ({ page }) => {
  await page.goto('http://localhost:5004');
  await page.click('text=Research');
  await expect(page.locator('#pageTitle')).toHaveText('Research');
  await expect(page.locator('#papersList')).not.toBeEmpty();
}); 