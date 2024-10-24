import { test } from '../fixtures/myFixtures';

test('First test', async ({ shopCarsPage }) => {
  await shopCarsPage.goto();

  await shopCarsPage.acceptCookies();

  await shopCarsPage.selectLocation('New South Wales', '2007', true);
 
  await shopCarsPage.selectAColor('Cosmos Black metallic');
  
  await shopCarsPage.sortResults("Price (descending)");

  await shopCarsPage.clickOnFirstCard();

  await shopCarsPage.saveCarDetailsToFile();

  await shopCarsPage.enquireNow();

  await shopCarsPage.fillFormOut("John", "Smith", "john.smith.com", '0441334500', "2007");

  await shopCarsPage.validateEmailAddressError();

});

