const BaseComponent = require("../common/base.component");

class CreateBoardComponent extends BaseComponent {
  constructor() {
    super("div");
  }

  get selectBackground() {
    return this.rootEl.$("div[id='background-picker'] ul:nth-of-type(1) li:nth-of-type(1) button[type='button']");
  }

  get titleInput() {
    return this.rootEl.$("input[data-testid='create-board-title-input']");
  }

}

module.exports = CreateBoardComponent;