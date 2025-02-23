const BaseComponent = require("../common/base.component");

class BoardComponent extends BaseComponent {
  constructor() {
    super("#content-wrapper");
  }

  get boardTitle() {
    return this.rootEl.$("h1[data-testid='board-name-display']");
  }

  get boardHeader() {
    return this.rootEl.$(".board-header");
  }

  get boardMenuBtn() {
    return this.boardHeader.$(
      "button span[data-testid='OverflowMenuHorizontalIcon']"
    );
  }

  get boardMenu() {
    return $('div[data-testid="board-menu-container"]');
  }

  get closeBoardBtn() {
    return this.boardMenu.$("li:nth-child(19) > button");
  }

  get confirmCloseBoardBtn() {
    return $(
      '.atlaskit-portal section button[data-testid="popover-close-board-confirm"]'
    );
  }

  get deleteBoardBtn() {
    return this.boardMenu.$(
      'button[data-testid="close-board-delete-board-button"]'
    );
  }

  get confirmDeleteBoardBtn() {
    return $(
      '.atlaskit-portal section button[data-testid="close-board-delete-board-confirm-button"]'
    );
  }
}

module.exports = BoardComponent;
