import { expect, type Page, type Locator } from "@playwright/test";

export default class ShopUsedCardsPage {
  page: Page;
  readonly acceptBtn: Locator;
  readonly stateSelector: Locator;
  readonly postalCodeField: Locator;
  readonly continueBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptBtn = page.getByRole("button", { name: "Agree to all"})
    this.stateSelector = page.locator(".dcp-header-location-modal-dropdown select") 
    this.postalCodeField = page.locator("input[aria-labelledby='postal-code-hint']")
    this.continueBTN = page.getByRole("button", { name: "Continue"})
  }

  /**
   * Go to the base url defined on playwright.config.ts
   */
  async goto(){
    await this.page.goto('')
  }

  /**
   * Accept the cookies
   */
  async acceptCookies() {
    await this.acceptBtn.click()
  }

  /**
   * This method replaces the .check() method that is not working for the radio buttons Private and Business.
   * It is a workaround that uses page.evaluate(). 
   * It was needed as there is an issue with the radio buttons.
   * 
   * @param purposePrivate boolean to check if its private or not (it's business)
   */
  async checkElementWorkaround(purposePrivate: Boolean){
    if (purposePrivate) {
      await this.page.evaluate(() => {
        const inputElement = document.querySelector('input[value="P"]') as HTMLInputElement;
        inputElement.checked = true;
      });
    } else {
      await this.page.evaluate(() => {
        const inputElement = document.querySelector('input[value="B"]') as HTMLInputElement;
        inputElement.checked = true;
      });
    }
  }

  /**
   * This method uses page.evaluate() to enable the Continue button.
   * This workaround is needed as using checkElementWorkaround() to check the radio buttons is not enabling the Continue button.
   */
  async enableContinueBtnWorkaround(){
    await this.page.evaluate((element) => {
      element!.removeAttribute('disabled');
    }, await this.continueBTN.elementHandle());
  }
  
  /**
   * Select location based on parameters
   * 
   * @param state name of the state in Australia
   * @param postalCode the postal code
   * @param purposePrivate boolean to check if its private or not (it's business)
   */
  async selectLocation(state: string, postalCode: string, purposePrivate: Boolean) {
    await this.stateSelector.selectOption(state)
    await this.postalCodeField.fill(postalCode)
    
    // workaround for bug found while checking the radio button and enable contine btn
    await this.checkElementWorkaround(purposePrivate)
    await this.enableContinueBtnWorkaround()
    
    await this.continueBTN.click()
  }

}