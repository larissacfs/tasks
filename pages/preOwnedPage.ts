import { type Page, type Locator, expect } from "@playwright/test";

export default class PreOwnedPage {
  page: Page;
  readonly acceptBtn: Locator;
  readonly colorsBtn: Locator;
  readonly sortingSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptBtn = page.getByRole("button", { name: "Agree to all"})
    this.colorsBtn = page.locator("button span:has-text('Colors')")
    this.sortingSelector = page.locator(".dcp-filter-dropdown select")
  }

  /**
   * Go to straight to the pre owned page
   */
  async goto(){
    await this.page.goto('https://www.mercedes-benz.com.au/passengercars/buy/used-car/search-results.html/')
  }

  /**
   * Accept the cookies
   */
  async acceptCookies() {
    await this.acceptBtn.click()
  }

  /**
   * Select one color to filter out the results
   * @param color The color to be selected
   */
  async selectColorFilter(color: string){
    await this.colorsBtn.click()
    // Below you can see the workaround to check the checkbox as .check() is not working.
    await this.page.evaluate((color) => {
      const element = document.querySelector(`input[name='${color}']`);
      if (element) {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(event);  
      }
    }, color);
  }

  async sortResults(option: string){
    await this.sortingSelector.selectOption(option);
  }
}
  