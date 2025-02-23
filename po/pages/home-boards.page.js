const BasePage = require("./base.page");
const BoardsComponent = require("../components/home-boards/home-boards.component");

class BoardsPage extends BasePage {
  constructor() {
    super("/es");
    this.boards = new BoardsComponent();
  }

  async validateEmail() {
    const expectedEmail = "mafejh274@gmail.com";
    await this.boards.accountButton.click();
    const emailText = await this.boards.emailElement.getText();
    await expect(emailText).toBe(expectedEmail);
  }

  async clickOnProfileAndVisibility() {
    await this.boards.profileAndVisibility.click();
  }

  async validateHomeBoardsEndpoint() {
    await expect(browser).toHaveUrl(expect.stringMatching(new RegExp('/mafejimenezh/boards$')));
  }
}

module.exports = BoardsPage;
