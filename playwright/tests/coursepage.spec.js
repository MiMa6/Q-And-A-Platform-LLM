// @ts-check
const { test, expect } = require("@playwright/test");
const testQuestion = "Who is Barack Obama?";

test("has heading", async ({ page }) => {
  await page.goto("http://localhost:7800/courses/1");

  // Expect heading contain name Full Stack Open
  await expect(
    page.getByRole("heading", { name: "Full Stack Open" })
  ).toBeVisible();
});

test("Write new question to input field", async ({ page }) => {
  // Expect to write new question to input field

  await page.goto("http://localhost:7800/courses/1");

  await page.waitForSelector('button[type="createButton"]');
  const createButton = await page.$('button[type="createButton"]');
  const isButtonVisible = await createButton.isVisible();
  expect(isButtonVisible).toBe(true);

  const inputField = await page.$('input[type="text"]');
  await inputField.fill(testQuestion);

  const isinputFieldVisible = await inputField.isVisible();
  expect(isinputFieldVisible).toBe(true);

  const inputFieldValue = await inputField.inputValue();
  expect(inputFieldValue).toBe(testQuestion);
});

test("Create new question and show it in UI", async ({ page }) => {
  // Expect new question to show in UI after creating it
  const testQuestion = "Who is Barack Obama?";

  await page.goto("http://localhost:7800/courses/1");

  await page.waitForSelector('button[type="createButton"]');
  const createButton = await page.$('button[type="createButton"]');
  const isButtonVisible = await createButton.isVisible();
  expect(isButtonVisible).toBe(true);

  const inputField = await page.$('input[type="text"]');
  await inputField.fill(testQuestion);

  const isinputFieldVisible = await inputField.isVisible();
  expect(isinputFieldVisible).toBe(true);

  const inputFieldValue = await inputField.inputValue();
  expect(inputFieldValue).toBe(testQuestion);

  // Create new question and Test that it is shown correctly
  await createButton.click();
  await page.waitForTimeout(1000);

  const questionTextElement = await page
    .locator('p[type="questionText"]')
    .nth(0);

  const questionText = await questionTextElement.textContent();
  console.log(questionText);
  expect(questionText).toBe(testQuestion);

  // Delete question
  const deleteQuestionButton = await page.$('button[type="deleteQuestionButton"]');
  const isDeleteButtonVisible = await deleteQuestionButton.isVisible();
  expect(isDeleteButtonVisible).toBe(true);
  await deleteQuestionButton.click();
});

test("Vote question", async ({ page }) => {
  await page.goto("http://localhost:7800/courses/1");

  await page.waitForSelector('button[type="voteQuestionButton"]');

  const voteQuestionButton = await page
    .locator('button[type="voteQuestionButton"]')
    .nth(0);

  const isButtonVisible = await voteQuestionButton.isVisible();
  expect(isButtonVisible).toBe(true);

  await voteQuestionButton.click();
  await page.waitForTimeout(1000);

  const voteQuestionTextElement = await page
    .locator('p[type="voteQuestionText"]')
    .nth(0);

  const voteQuestionText = await voteQuestionTextElement.textContent();
  console.log(voteQuestionText);
  expect(voteQuestionText).toBe("1");

  // Delete vote (By clicking button again)
  await voteQuestionButton.click();
  await page.waitForTimeout(1000);

  const voteQuestionText2 = await voteQuestionTextElement.textContent();
  console.log(voteQuestionText2);
  expect(voteQuestionText2).toBe("0");

});

