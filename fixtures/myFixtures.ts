import { test as base } from "@playwright/test";
import ShopCarsPage from "../pages/shopCarsPage";

// Extend basic test by providing a two new fixtures (our page object pages)
export const test = base.extend<{
  shopCarsPage: ShopCarsPage;
}>({
    shopCarsPage: async({page}, use) => {
    await use(new ShopCarsPage(page));
  }
});

export const expect = base.expect;