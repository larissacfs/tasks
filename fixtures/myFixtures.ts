import { test as base } from "@playwright/test";
import ShopUsedCardsPage from "../pages/shopUsedCardsPage"

// Extend basic test by providing a two new fixtures (our page object pages)
export const test = base.extend<{
    shopUsedCardsPage: ShopUsedCardsPage;
}>({
    shopUsedCardsPage: async({page}, use) => {
    await use(new ShopUsedCardsPage(page));
  }
});

export const expect = base.expect;