import { type Page, type Locator, expect } from '@playwright/test';
import fs from 'fs';

export default class ShopCarsPage {
  page: Page;
  readonly acceptBtn: Locator;
  readonly stateSelector: Locator;
  readonly postalCodeField: Locator;
  readonly continueBTN: Locator;
  readonly filterToggle: Locator;
  readonly colourMenuOption: Locator;
  readonly colourBtn: Locator;
  readonly sortingSelector: Locator;
  readonly exploreAnByAnchorLink: Locator;
  readonly carYear: Locator;
  readonly carVIN: Locator;
  readonly speakToAnExpertBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly EmailInput: Locator;
  readonly phoneInput: Locator;
  readonly postalCodeInput: Locator;
  readonly privacyCheckbox: string;
  readonly smsDirectMarketingCheckbox: string;
  readonly proceedBtn: Locator;
  readonly emailErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptBtn = page.getByRole('button', { name: 'Agree to all' });
    this.stateSelector = page.locator(
      '.dcp-header-location-modal-dropdown select'
    );
    this.postalCodeField = page.locator(
      "input[aria-labelledby='postal-code-hint']"
    );
    this.continueBTN = page.getByRole('button', { name: 'Continue' });
    this.filterToggle = page.locator('.filter-toggle');
    this.colourMenuOption = page.locator(
      ".category-filter-row p:text-is('Colour')"
    );
    this.colourBtn = page.locator("a span:text-is(' Colour ')");
    this.sortingSelector = page.locator(
      '.dcp-cars-srp__sorting-dropdown select'
    );
    this.exploreAnByAnchorLink = page.locator(
      "a span:text-is('Explore & Buy')"
    );
    this.carYear = page.locator(
      "span[data-test-id='dcp-cars-buy-box-vehicle-characteristics-model-year']"
    );
    this.carVIN = page.locator("span:has-text('VIN') + span");
    this.speakToAnExpertBtn = page.locator(
      "button[data-test-id='dcp-buy-box__contact-seller']"
    );
    this.firstNameInput = page.locator("label:has-text('First Name') + input");
    this.lastNameInput = page.locator("label:has-text('Last Name') + input");
    this.EmailInput = page.locator("label:has-text('E-Mail') + input");
    this.phoneInput = page.locator("label:has-text('Phone') + input");
    this.postalCodeInput = page.locator(
      "label:has-text('Postal Code') + input"
    );
    this.privacyCheckbox =
      "div[data-test-id='rfq-contact__consent-privacy'] input";
    this.smsDirectMarketingCheckbox =
      '.dcp-multi-checkbox__options input:nth-of-type(1)';
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
    this.emailErrorMsg = page.getByText(
      'Please enter a valid email address using a minimum of six characters.'
    );
  }

  /**
   * Go to the base url defined on playwright.config.ts
   */
  async goto() {
    await this.page.goto('');
  }

  /**
   * Accept the cookies
   */
  async acceptCookies() {
    await this.acceptBtn.click();
  }

  /**
   * This method replaces the .check() method that is not working for the radio buttons Private and Business.
   * It is a workaround that uses page.evaluate().
   * It was needed as there is an issue with the radio buttons.
   * @param purposePrivate boolean to check if its private or not (it's business)
   */
  async checkElementWorkaround(purposePrivate: boolean) {
    const value = purposePrivate ? 'P' : 'B';
    // eslint-disable-next-line no-shadow
    await this.page.evaluate((value) => {
      const inputElement = document.querySelector(
        `input[value='${value}']`
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.checked = true;
      }
    }, value);
  }

  /**
   * This method uses page.evaluate() to enable the Continue button.
   * This workaround is needed as using checkElementWorkaround() to check the radio buttons is not enabling the Continue button.
   */
  async enableContinueBtnWorkaround() {
    await this.page.evaluate(
      (element) => {
        element!.removeAttribute('disabled');
      },
      await this.continueBTN.elementHandle()
    );
  }

  /**
   * Select location based on parameters
   *
   * @param state name of the state in Australia
   * @param postalCode the postal code
   * @param purposePrivate boolean to check if its private or not (it's business)
   */
  async selectLocation(
    state: string,
    postalCode: string,
    purposePrivate: boolean
  ) {
    await this.stateSelector.selectOption(state);
    await this.postalCodeField.fill(postalCode);

    // workaround for bug found while checking the radio button and enable continue btn
    await this.checkElementWorkaround(purposePrivate);
    await this.enableContinueBtnWorkaround();

    await this.continueBTN.click();
  }

  /**
   * Method to click on the filter button when accessing the page.
   * But it only clicks if the wrapper with the filter menu is not already open.
   */
  async clickOnFilterToggle() {
    // Locate the wrapper element
    const wrapper = this.page.locator('.wrapper');
    // Check if the wrapper element contains the 'show' class
    const hasShowClass = await wrapper.evaluate((el) =>
      el.classList.contains('show')
    );
    if (!hasShowClass) {
      // Click the button if the 'show' class is not present
      await this.filterToggle.click();
    }
  }

  /**
   * Select a colour
   * @param colour The color to be selected
   */
  async selectAColor(colour: string) {
    await this.colourMenuOption.click();
    await this.colourBtn.click();
    await this.page.locator(`a:has-text('${colour}')`).first().click();
  }

  /**
   * Sorts out the results
   * @param option The option can be: Price:
   * 'Relevance', 'Name (ascending)', 'Name (descending)', 'Price (ascending)' and 'Price (descending)'
   */
  async sortResults(option: string) {
    await this.sortingSelector.selectOption(option);
  }

  /**
   * Click on the first card result displayed
   */
  async clickOnFirstCard() {
    await this.exploreAnByAnchorLink.first().click();
  }

  /**
   * Save the car details (Model Year and VIN) to a file
   */
  async saveCarDetailsToFile() {
    const VIN = await this.carVIN.innerText();
    const year = await this.carYear.innerText();
    fs.writeFileSync('carInfo.txt', `VIN: ${VIN}, Model Year: ${year}`, 'utf8');
  }

  /**
   * Click on Speak to an expert Btn
   */
  async enquireNow() {
    await this.speakToAnExpertBtn.click();
  }

  /**
   * Workaround to click by using page.evaluate() and the Mouse Event.
   * This is useful for when click() is not working.
   */
  async clickByMouseEventWorkaround(value: string) {
    // eslint-disable-next-line no-shadow
    await this.page.evaluate((value) => {
      const element = document.querySelector(value);
      if (element) {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(event); // Dispatch a 'click' event
      }
    }, value);
  }

  /**
   * Fill out the contact form
   *
   * @param firstName The first name
   * @param lastName The last name
   * @param email The email
   * @param phone The phone
   * @param postalCode The postal code
   */
  async fillFormOut(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.EmailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.postalCodeInput.fill(postalCode);
    await this.clickByMouseEventWorkaround(this.privacyCheckbox);
    await this.clickByMouseEventWorkaround(this.smsDirectMarketingCheckbox);
    await this.proceedBtn.click();
  }

  /**
   * Validate that the invalid email error message is visible
   */
  async validateEmailAddressError() {
    await expect(this.emailErrorMsg).toBeVisible();
  }
}
