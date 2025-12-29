import { expect, Locator, Page, test } from '@playwright/test';

export class MenuPage {
  protected casePool: Locator;
  protected reports: Locator;
  protected search: Locator;
  protected logout: Locator;

  constructor(readonly page: Page) {
    this.casePool = this.page.getByText('Case pool', { exact: true });
    this.reports = this.page.getByText('Reports', { exact: true });
    this.search = this.page.getByRole('link', { name: 'Search' });
    this.logout = this.page.getByRole('link', { name: 'Logout' });
  }

  async clickSearch(): Promise<void> {
    await this.search.click();
  }
  async clickLogout(): Promise<void> {
    await this.logout.click();
  }
  async clickReports(): Promise<void> {
    await this.reports.click();
  }
  async clickCasePool(): Promise<void> {
    await this.casePool.click();
  }

  async seeMenuList(): Promise<void> {
    await test.step('should see user menu list', async () => {
      await this.assertMenuVisibility(this.casePool, this.reports, this.search, this.logout);
    });
  }

  async assertMenuVisibility(...items: Locator[]) {
    for (const item of items) {
      await expect.soft(item).toBeVisible();
    }
  }
}
