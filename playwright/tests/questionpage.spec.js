// @ts-check
const { test, expect } = require("@playwright/test");
const testAnswer = "MR President";

test("has heading", async ({ page }) => {
  await page.goto("http://localhost:7800/questions/1");

  // Expect heading contain name Full Stack Open
  await expect(
    page.getByRole("heading", { name: "What is the main focus of the Full Stack Open course?" })
  ).toBeVisible();
});

test("Create new answer and show it in UI", async ({ page }) => {
  // Expect new answer to show in UI after creating it

  await page.goto("http://localhost:7800/questions/1");

  await page.waitForSelector('button[type="createButton"]');
  const createButton = await page.$('button[type="createButton"]');
  const isButtonVisible = await createButton.isVisible();
  expect(isButtonVisible).toBe(true);

  const inputField = await page.$('input[type="text"]');
  await inputField.fill(testAnswer);

  const isinputFieldVisible = await inputField.isVisible();
  expect(isinputFieldVisible).toBe(true);

  const inputFieldValue = await inputField.inputValue();
  expect(inputFieldValue).toBe(testAnswer);


  // Create new answer and Test that it is shown correctly
  await createButton.click();
  await page.waitForTimeout(1000);

  const answerTextElement = await page
    .locator('p[type="answerText"]')
    .nth(0);

  const answerText = await answerTextElement.textContent();
  console.log(answerText);
  expect(answerText).toBe(testAnswer);

  await page.waitForTimeout(1000);
  
  // Delete answer 
  const deleteAnswerButton = await page.$('button[type="deleteAnswerButton"]');
  const isDeleteButtonVisible = await deleteAnswerButton.isVisible();
  expect(isDeleteButtonVisible).toBe(true);
  await deleteAnswerButton.click();

});

