import { test as base } from "@playwright/test";
import ShopCarsPage from "../pages/shopCarsPage";
import PreOwnedPage from "../pages/preOwnedPage";

// Extend basic test by providing a two new fixtures (our page object pages)
export const test = base.extend<{
  shopCarsPage: ShopCarsPage;
  preOwnedPage: PreOwnedPage;
}>({
    shopCarsPage: async({page}, use) => {
    await use(new ShopCarsPage(page));
  },
    preOwnedPage: async({page}, use) => {
    await use(new PreOwnedPage(page));
  }
});

export const expect = base.expect;