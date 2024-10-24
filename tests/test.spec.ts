import { test } from '../fixtures/myFixtures';

test('First test', async ({ shopCarsPage, preOwnedPage }) => {
  await shopCarsPage.goto();

  await shopCarsPage.acceptCookies();

  await shopCarsPage.selectLocation('New South Wales', '2007', true);

  await shopCarsPage.selectPreOwnedFilter();

  await preOwnedPage.acceptCookies();

  await preOwnedPage.selectColorFilter('Blue');

  await preOwnedPage.sortResults("Price: High to Low")

});

