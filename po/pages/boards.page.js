const BasePage = require("./base.page");
const BoardsComponent = require("../components/boards/boards.component");

class BoardsPage extends BasePage {
  constructor() {
    super("/es");
    this.boards = new BoardsComponent();
  }

async validateEmail() {
  const expectedEmail = "mafejh274@gmail.com";
  await this.boards.accountButton.click();
  const emailText = await this.boards.emailElement.getText();
  expect(emailText).toBe(expectedEmail);
}

async clickOnProfileAndVisibility(){
  await this.boards.profileAndVisibility.click();
}
}

module.exports = BoardsPage;
