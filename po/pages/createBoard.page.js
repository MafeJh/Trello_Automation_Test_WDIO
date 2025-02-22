const BasePage = require("./base.page");
const CreateBoardComponent = require("../components/createBoard/createBoard.component");

class CreateBoardPage extends BasePage {
  constructor() {
    super("/es");
    this.createBoard = new CreateBoardComponent();
  }

  async clickSelectBackground(){
    await this.createBoard.selectBackground.click();
  }

  async typeTitleInput(){
    await this.createBoard.titleInput.setValue("Tablero");
  }
}

module.exports = CreateBoardPage;
