// @ts-check
const { test, expect } = require("@playwright/test");

test("has heading and course titles", async ({ page }) => {
  await page.goto("http://localhost:7800/");

  // Expect heading contain name Courses
  await expect(page.getByRole("heading", { name: "Courses" })).toBeVisible();

  // Expect to find 2 premade courses

  // Find the course title elements and txts

  const courseTitleElement1 = await page
    .locator('h1[type="courseTitle"]')
    .nth(0);
  const courseTitle1 = await courseTitleElement1.textContent();
  
  const courseTitleElement2 = await page
    .locator('h1[type="courseTitle"]')
    .nth(1);
    const courseTitle2 = await courseTitleElement2.textContent();

  // Check if the course titles equals course titles
  expect(courseTitle1).toBe("Full Stack Open");
  expect(courseTitle2).toBe("Designing and Building Scalable Web Applications");

});
