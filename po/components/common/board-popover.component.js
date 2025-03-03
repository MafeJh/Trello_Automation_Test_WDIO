import BaseComponent from "./base.component";

class BoardPopoverComponent extends BaseComponent {
  constructor() {
    super('section[data-testid="header-create-menu-popover"]');
  }

  get createBoardBtn() {
    return this.rootEl.$("button[data-testid='header-create-board-button']");
  }

  get titleInput() {
    return this.rootEl.$("input[data-testid='create-board-title-input']");
  }

  get background() {
    return this.rootEl.$("[data-testid='create-board-title-input']");
  }

  get createButton() {
    return this.rootEl.$("button[data-testid='create-board-submit-button']");
  }
}

export default BoardPopoverComponent;
