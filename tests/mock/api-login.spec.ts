import { expect, test } from '@ui/fixtures/baseFixture';
const TEST_URL = 'https://demo.playwright.dev/api-mocking';
/**
 * sample based on doc
 */
test('@api mock api request', async ({ page }) => {
  // mock body request
  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [
      { id: 1, name: 'quangto' },
      { id: 2, name: 'toquang' }
    ];
    await route.fulfill({ json });
  });
  // asserrt response data
  await page.goto(TEST_URL);
  await expect(page.getByText('quangto')).toBeVisible();
  await expect(page.getByText('toquang')).toBeVisible();
});

test('@api  mock api response', async ({ page }) => {
  const mockingNameRes = 'quangtoo';
  await page.route('*/**/api/v1/fruits', async (route) => {
    const reponse = await route.fetch();
    //mock response data
    const json = await reponse.json();
    await json.push({ name: mockingNameRes, id: 1 });
    await route.fulfill({ json });
  });
  //assert mock data
  await page.goto(TEST_URL);
  await expect(page.getByText(mockingNameRes)).toBeVisible();
});

test('@api  mock test with har', async ({ page }) => {
  //prepare data
  await page.routeFromHAR('tests/mock/automationintesting.online.har', { url: '**/admin/rooms', update: false });

  // asserrt page
  await page.goto('https://automationintesting.online/admin/rooms');
  await expect(page.getByText('Create')).toBeVisible();
});
