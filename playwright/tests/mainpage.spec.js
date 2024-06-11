// @ts-check
const { test, expect } = require("@playwright/test");

test('has heading "Courses"', async ({ page }) => {
  await page.goto("http://localhost:7800/");

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Courses" })).toBeVisible();
});
