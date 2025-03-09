import BasePage from "./base.page";
import BoardsComponent from "../components/home-boards/home-boards.component";

class HomeBoardsPage extends BasePage {
  constructor() {
    super("/es");
    this.boards = new BoardsComponent();
  }

  async validateEmail() {
    await this.boards.accountButton.waitForDisplayed({ timeout: 20000 });
    const expectedEmail = process.env.EMAIL;

    await this.boards.accountButton.click();

    const emailText = await this.boards.emailElement.getText();
    const errorMessage = "Email does not match with the expected one";

    expect(emailText).to.equal(expectedEmail, errorMessage);
    assert.strictEqual(emailText, expectedEmail, errorMessage);
    emailText.should.equal(expectedEmail, errorMessage);
  }

  async clickOnProfileAndVisibility() {
    await this.boards.profileAndVisibility.click();
  }

  async validateHomeBoardsEndpoint() {
    const currentUrl = await browser.getUrl();
    const errorMessage = "Board URL does not match with the expected one";
    const matchingRegex = /\/mafejimenezh\/boards$/;

    expect(currentUrl).to.match(matchingRegex, errorMessage);
    assert.match(currentUrl, matchingRegex, errorMessage);
    currentUrl.should.match(matchingRegex, errorMessage);
  }

  async goToBoards() {
    await this.boards.boardsBtn.click();
  }
}

export default HomeBoardsPage;
