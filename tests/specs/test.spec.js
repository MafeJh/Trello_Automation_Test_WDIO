const { pages } = require("./../../po/index");

describe("Navigating in trello web page", () => {
  let landingPage = null;
  let homeBoardsPage = null;
  let signInPage = null;
  let profileAndVisibility = null;
  let headerPage = null;
  let boardPage = null;

  beforeEach(async () => {
    // Instances
    landingPage = pages("landing");
    signInPage = pages("signIn");
    homeBoardsPage = pages("homeBoards");
    profileAndVisibility = pages("profileAndVisibility");
    headerPage = pages("header");
    boardPage = pages("board");
    // Open URL
    await browser.maximizeWindow();
    await browser.deleteCookies();
    await landingPage.open();
  });
  afterEach(() => {
    landingPage = null;
    homeBoardsPage = null;
    signInPage = null;
    profileAndVisibility = null;
    headerPage = null;
    boardPage = null;
  });
  it("Log In in Trello web site with valid credentials", async () => {
    // Sign In
    await landingPage.clickOnSingInButton();
    await signInPage.typeInEmailInput();
    await signInPage.clickOnContinueButton();
    await signInPage.typeInPasswordInput();
    await signInPage.clickOnLogInButton();
    
    // Validate email
    await homeBoardsPage.validateEmail();

    // Edit profile and visibility
    await homeBoardsPage.validateHomeBoardsEndpoint();
    await homeBoardsPage.clickOnProfileAndVisibility();
    await profileAndVisibility.enterUsername();
    await profileAndVisibility.enterBiography();
    await profileAndVisibility.clickOnSaveButton();

    // Create new board
    await headerPage.openCreateBoardMenu();
    await headerPage.verifyCreateMenuIsDisplayed();
    await headerPage.clickOnCreateBoard();
    await headerPage.selectBackground();
    await headerPage.typeTitleInput();
    await headerPage.clickOnCreateButton();

    // Verify new board is created
    await boardPage.validateBoardsTitle();
    await boardPage.validateEndpointBoardsTitle();

    // Create a list

    // Create a card 

    // Card filtering (MAFE)

    // Edit workspace (MAFE)

    // Open Board Menu
    await boardPage.openBoardMenu();
    // Close current board
    await boardPage.closeCurrentBoard();
    await boardPage.confirmCloseCurrentBoard();
    await boardPage.deleteCurrentBoard();
    await boardPage.confirmDeleteCurrentBoard();
    // Verify is on Home Boards Page
    await homeBoardsPage.validateHomeBoardsEndpoint();
  });

  /*
  Scenario: User signs in with valid credentials  
  Given the user is on the Trello sign-in page  
  When the user enters a registered email and correct password  
  And clicks on the "Log In" button  
  Then the user should be redirected to the dashboard  
  And the user's boards should be displayed  


  Scenario: User updates their profile information  
  Given the user is logged in and on their profile page  
  When the user edits their display name and bio  
  And clicks on the "Save Changes" button  
  Then the profile should be updated with the new information  
  And a success message should be displayed  
  */
});
