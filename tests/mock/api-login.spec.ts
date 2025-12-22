import { expect, test } from '@ui/fixtures/baseFixture';
const TEST_URL = 'https://demo.playwright.dev/api-mocking';
/**
 * sample based on doc
 */
test('@api mock api request', async ({ page }) => {
  //prepare data
  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [
      { id: 1, name: 'quangto' },
      { id: 2, name: 'toquang' }
    ];
    await route.fulfill({ json });
  });
  // call page and asserrt
  await page.goto(TEST_URL);
  await expect(page.getByText('quangto')).toBeVisible();
  await expect(page.getByText('toquang')).toBeVisible();
});

test('@api  mock api response', async ({ page }) => {
  //prepare data
  await page.route('*/**/api/v1/fruits', async (route) => {
    const reponse = await route.fetch();
    const json = await reponse.json();
    await json.push({ name: 'qtoo', id: 1 });
    await route.fulfill({ json });
  });
  // call page and asserrt
  await page.goto(TEST_URL);
  await expect(page.getByText('qtoo')).toBeVisible();
});
