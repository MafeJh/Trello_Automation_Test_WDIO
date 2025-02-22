const { pages } = require("./../../po/index");

describe("Navigating in trello web page", () => {
  let homePage = null;
  let boardsPage = null;
  let logInPage = null;
  let profileAndVisibility = null;
  let headerPage = null;
  let createBoardPage = null;
  beforeEach(async () => {
    // Instances
    homePage = pages("home");
    logInPage = pages("login");
    boardsPage = pages("board");
    profileAndVisibility = pages("profileAndVisibility");
    headerPage = pages("header");
    createBoardPage = pages("createBoard");
    // Open URL
    await browser.maximizeWindow();
    await browser.deleteCookies();
    await homePage.open();
  
  });
  afterEach(() => {
    homePage = null;
    boardsPage = null;
    logInPage = null;
    profileAndVisibility = null;
    headerPage = null;
    createBoardPage = null;
  });
  it("Log In in Trello web site with valid credentials", async () => {
    await homePage.clickOnSingInButton();
    await logInPage.typeInEmailInput();
    await logInPage.clickOnContinueButton();
    await logInPage.typeInPasswordInput();
    await logInPage.clickOnLogInButton();
    //await browser.pause(20000); // 20 segundos
    await boardsPage.validateEmail();

    await boardsPage.clickOnProfileAndVisibility();
    //await browser.pause(20000);
    await profileAndVisibility.enterUsername();
    await profileAndVisibility.enterBiography();
    await profileAndVisibility.clickOnSaveButton();

    
    await headerPage.clickOnAddBoardButton();
    await headerPage.clickOnCreateBoard();
    await createBoardPage.clickSelectBackground();
    await createBoardPage.typeTitleInput();
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
