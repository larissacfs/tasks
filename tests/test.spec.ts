import { test } from '../fixtures/myFixtures';

test('First test', async ({ shopUsedCardsPage }) => {
  await shopUsedCardsPage.goto();

  await shopUsedCardsPage.acceptCookies()

  await shopUsedCardsPage.selectLocation('New South Wales', '2007', true)

});

