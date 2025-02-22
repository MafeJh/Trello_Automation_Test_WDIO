const BasePage = require("./base.page");
const HeaderComponent = require("../components/common/header.component");

class HeaderPage extends BasePage {
  constructor() {
    super("/es");
    this.header = new HeaderComponent();
  }

async clickOnAddBoardButton(){
  await this.header.addBoardButton.click();
}

async clickOnCreateBoard(){
  await this.header.createBoard.click();
}
}

module.exports = HeaderPage;
