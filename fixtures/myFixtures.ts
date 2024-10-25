import { test as base } from '@playwright/test'
import ShopCarsPage from '../pages/shopCarsPage'

export const test = base.extend<{
  shopCarsPage: ShopCarsPage
}>({
  shopCarsPage: async ({ page }, use) => {
    await use(new ShopCarsPage(page))
  }
})

export const expect = base.expect
