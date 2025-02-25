const { Given, When, Then } = require('@wdio/cucumber-framework');
const { pages } = require('./../po/index');

let landingPage, signInPage, homeBoardsPage, profileAndVisibility, headerPage, boardPage;

// Scenario: User signs in with valid credentials
Given('the user is on the Trello sign-in page', async () => {
  landingPage = pages("landing");
  signInPage = pages("signIn");
  homeBoardsPage = pages("homeBoards");
  profileAndVisibility = pages("profileAndVisibility");
  headerPage = pages("header");
  boardPage = pages("board");

  await browser.maximizeWindow();
  await browser.deleteCookies();
  await landingPage.open();
});
When('the user enters a registered email and correct password', async () => {
  await landingPage.clickOnSingInButton();
  await signInPage.singIn();
});
When('clicks on the "Sign In" button', async () => {
  await signInPage.clickOnLogInButton();
});
Then('the user should be redirected to the dashboard', async () => {
  await homeBoardsPage.validateEmail();
});
Then('the user\'s boards should be displayed', async () => {
  await homeBoardsPage.validateHomeBoardsEndpoint();
});

// Scenario: User updates their profile information
Given('the user is logged in and on their profile page', async () => {
  await homeBoardsPage.clickOnProfileAndVisibility();
});
When('the user edits their display name and bio', async () => {
  await profileAndVisibility.updateProfile();
});
Then('the profile should be updated with the new information', async () => {
  // TODO: Verify elements
});
Then('a success message should be displayed', async () => {
  // TODO: Verify elements
});

// Scenario: User creates a new board
Given('the user is on the Trello dashboard', async () => {
  // TODO: Verify elements
});
When('the user clicks on the "Create new board" button', async () => {
  await headerPage.openCreateBoardMenu();
  await headerPage.verifyCreateMenuIsDisplayed();
  await headerPage.clickOnCreateBoard();
});
When('enters a board name and selects a background color', async () => {
  await headerPage.selectBackground();
  await headerPage.typeBoardName('Bootcamp');
  await headerPage.clickOnCreateButton();
});
Then('a new board should be created and displayed on the dashboard', async () => {
  await boardPage.validateBoardsTitle();
  await boardPage.validateEndpointBoardsTitle();
});
Then("the user should be redirected to the new board's page", async () => {
  // TODO: Verify elements
});

// // Scenario: User searches for an existing board
// Given('the user is on the Trello dashboard', async () => {
//   // TODO:
// });
// When('the user types the board name in the search bar', async () => {
//   // TODO:
// });
// When('presses the "Enter" key', async () => {
//   // TODO:
// });
// Then('the board matching the search criteria should be displayed in the results', async () => {
//   // TODO:
// });


// // Scenario: User adds a new list to a board
Given('the user is on an open board', async () => {
  // TODO: Verify elements
});
When('the user clicks on the "Add a list" button', async () => {
  await browser.pause(1000);
  await boardPage.clickOnNewBoardListAction();
});
When('enters a list name and hits "Enter"', async () => {
  await boardPage.typeBoardListName('Bootcamp list');
});
Then('the new list should be added to the board', async () => {
  await boardPage.verifyNewBoardIsDisplayed('Bootcamp list');
});

// Scenario: User adds a new card to a list
Given('the user is viewing a list on a board', async () => {
  // TODO: Verify elements
});
When('the user clicks on the "Add a card" option under the list', async () => {
  await boardPage.clickOnNewCardAction();
});
When('enters card titles and hits "Enter"', async () => {
  for (const cardName of ['Bootcamp card 3', 'Bootcamp card 1', 'Bootcamp card 2']) {
    await boardPage.typeBoardCardName(cardName);
    await browser.pause(500);
  }
});
Then('the new card should appear in the list', async () => {
  // TODO: Verify elements
});

// // Scenario: User filters cards on a board
// Given('the user is on an open board with multiple cards', async () => {
//   // TODO:
// });
// When('the user clicks on the "Filter" button', async () => {
//   // TODO:
// });
// When('enters a keyword or selects a label in the filter options', async () => {
//   await boardPage.filterCreatedCardsBy(3);// Alphabetically: 3
// });
// Then('only the cards matching the filter criteria should be displayed', async () => {
//   // TODO:
// });
// Then('non-matching cards should be hidden', async () => {
//   // TODO:
// });

// // Scenario: User edits the workspace name and description
// Given('the user is on the workspace settings page', async () => {
//   // TODO:
// });
// When('the user changes the workspace name and description', async () => {
//   // TODO:
// });
// When('clicks on the "Save" button', async () => {
//   // TODO:
// });
// Then('the workspace should be updated with the new name and description', async () => {
//   // TODO:
// });
// Then('a confirmation message should be displayed', async () => {
//   // TODO:
// });