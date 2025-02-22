const BaseComponent = require("../common/base.component");

class HeaderComponent extends BaseComponent {
  constructor() {
    super("div");
  }

  get addBoardButton(){
    return this.rootEl.$("div[id='surface'] span[data-testid='AddIcon']");
  }

  get createBoard(){
    return this.rootEl.$("button[data-testid='header-create-board-button']");
  }

}

module.exports = HeaderComponent;