import { BasePage } from './basePage';
import { Page } from '@playwright/test';
import { MenuPage } from './menuPage';

export class AdminPage extends BasePage {
  readonly menu: MenuPage;
  constructor(readonly page: Page) {
    super(page);
    this.menu = new MenuPage(page);
  }
}
