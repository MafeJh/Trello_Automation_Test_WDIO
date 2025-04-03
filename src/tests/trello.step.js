import { Given, When, Then } from "@wdio/cucumber-framework";
import pages from "../po";

// PAGES
let landingPage,
  signInPage,
  homeBoardsPage,
  profileAndVisibility,
  headerPage,
  boardPage,
  workspacePage;

// TODO: Move texts to a JSON so it gets more organized
const USERNAME = process.env.TRELLO_USERNAME || "";
const EMAIL = process.env.EMAIL || "";
const PASSWORD = process.env.PASSWORD || "";
const BOARD_NAME = "Bootcamp";
const BOARD_LIST_NAME = `${BOARD_NAME} list`;
const WORKSPACE_NAME = "Mafe's workspace";
const WORKSPACE_DESCRIPTION = "";
const BIOGRAPHY_DESCRIPTION = "Hola! Bienvenido a mi trello de QA Automation";
const BOARD_CARD_NAMES = [
  `${BOARD_NAME} card 3`,
  `${BOARD_NAME} card 1`,
  `${BOARD_NAME} card 2`,
];

const _CardStatus = Object.freeze({
  MarkAsCompleted: "markAsCompleted",
  MarkAsNotCompleted: "markAsNotCompleted",
});

// Scenario: User signs in with valid credentials
Given("the user is on the Trello sign-in page", async () => {
  landingPage = pages("landing");
  signInPage = pages("signIn");
  homeBoardsPage = pages("homeBoards");
  profileAndVisibility = pages("profileAndVisibility");
  headerPage = pages("header");
  boardPage = pages("board");
  workspacePage = pages("workspace");

  await browser.maximizeWindow();
  await browser.deleteCookies();
  await landingPage.open();
});
When("the user enters a registered email and correct password", async () => {
  await landingPage.clickOnSingInButton();
  await signInPage.singIn(EMAIL, PASSWORD);
});
When('clicks on the "Sign In" button', async () => {
  await signInPage.clickOnLogInButton();
});
Then("the user should be redirected to the dashboard", async () => {
  await homeBoardsPage.validateEmail();
});
Then("the user's boards should be displayed", async () => {
  await homeBoardsPage.validateHomeBoardsEndpoint();
});

// Scenario: User updates their profile information
Given("the user is logged in and on their profile page", async () => {
  await homeBoardsPage.clickOnProfileAndVisibility();
});
When("the user edits their display name and bio", async () => {
  await profileAndVisibility.updateProfile(USERNAME, BIOGRAPHY_DESCRIPTION);
});
Then("the profile should be updated with the new information", async () => {
  await profileAndVisibility.validateEndpointUsername(USERNAME);
});
Then("a success message should be displayed", async () => {
  await profileAndVisibility.validateAlertSaved();
});

// Scenario: User creates a new board
Given("the user is on the Trello dashboard", async () => {
  await headerPage.goToHomeBoards();
});
When('the user clicks on the "Create new board" button', async () => {
  await headerPage.openCreateBoardMenu();
  await headerPage.verifyCreateMenuIsDisplayed();
  await headerPage.clickOnCreateBoard();
});
When("enters a board name and selects a background color", async () => {
  await headerPage.selectBackground();
  await headerPage.typeBoardName(BOARD_NAME);
  await headerPage.clickOnCreateButton();
});
Then(
  "a new board should be created and displayed on the dashboard",
  async () => {
    await boardPage.validateEndpointBoardsTitle(BOARD_NAME.toLowerCase());
  },
);

// Scenario: User adds a new list to a board
Given("the user is on an open board", async () => {
  await boardPage.ensureBoardIsOpen(BOARD_NAME);
});
When('the user clicks on the "Add a list" button', async () => {
  await browser.pause(1000);
  await boardPage.clickOnNewBoardListAction();
});
When('enters a list name and hits "Enter"', async () => {
  await boardPage.typeBoardListName(BOARD_LIST_NAME);
});
Then("the new list should be added to the board", async () => {
  await boardPage.verifyNewBoardIsDisplayed(BOARD_LIST_NAME);
});

// Scenario: User adds a new card to a list
Given("the user is viewing a list on a board", async () => {
  await boardPage.isAddACardButtonPresent();
});
When('the user clicks on the "Add a card" option under the list', async () => {
  await boardPage.clickOnNewCardAction();
  await browser.pause(1000);
});
When('enters card titles and hits "Enter"', async () => {
  for (const cardName of BOARD_CARD_NAMES) {
    // await browser.pause(1000);
    await boardPage.typeBoardCardName(cardName);
    await browser.pause(500);
  }
});
Then("the new card should appear in the list", async () => {
  await boardPage.validateEachCardIsPresentAndHaveText(BOARD_CARD_NAMES);
});

/* // Scenario: User filters cards on a board
Given("the user is on an open board with multiple cards", async () => {
  await boardPage.ensureBoardIsOpen(BOARD_NAME);
});
When('the user clicks on the "Filter" button', async () => {
  await boardPage.openFilterPopover();
});
When("enters a keyword or selects a label in the filter options", async () => {
  await boardPage.checkStatusMarkAsCompleted();
});
Then(
  "only the cards matching the filter criteria should be displayed",
  async () => {
    await boardPage.validateFilterResult(CardStatus.MarkAsCompleted);
  }
);
When(
  "enters a keyword or selects a label in the filter options as not completed",
  async () => {
    await boardPage.checkStatusMarkAsNotCompleted();
  }
);

Then("non-matching cards should be hidden", async () => {
  await boardPage.validateFilterResult(CardStatus.MarkAsNotCompleted);
}); */

//Scenario: User edits the workspace name and description
Given("the user is on the workspace settings page", async () => {
  await boardPage.openWorkSpace();
  await browser.pause(500);
  await workspacePage.clickOnEditWorkSpace();
});
When("the user changes the workspace name and description", async () => {
  await workspacePage.changeNameAndDescription(
    WORKSPACE_NAME,
    WORKSPACE_DESCRIPTION,
  );
});
When('clicks on the "Save" button', async () => {
  await workspacePage.saveChanges();
});
Then(
  "the workspace should be updated with the new name and description",
  async () => {
    await workspacePage.verifyNameAndDescription();
  },
);

// Scenario: User searches for an existing board
Given("from the Trello dashboard", async () => {
  await headerPage.goToHomeBoards();
  await homeBoardsPage.goToBoards();
});
When("the user types the board name in the search bar", async () => {
  await workspacePage.typeBoardsName(BOARD_NAME);
});
When('presses the "Enter" key', async () => {
  await browser.keys("Enter");
  await workspacePage.openBoardCardLink();
});
Then(
  "the board matching the search criteria should be displayed in the results",
  async () => {
    await boardPage.validateEndpointBoardsTitle(BOARD_NAME.toLowerCase());
    await boardPage.ensureBoardIsOpen(BOARD_NAME);
  },
);
