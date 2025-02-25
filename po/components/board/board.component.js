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

  // Board canvas
  get boardCanvas() {
    return this.rootEl.$('div[data-testid="board-canvas"]');
  }

  // Board list
  get addBoardListActionBtn() {
    return $('button[data-testid="list-composer-button"]');
  }

  get boardListInput() {
    return this.boardCanvas.$('form textarea[data-testid="list-name-textarea"]');
  }

  get newBoardList() {
    return this.boardCanvas.$(`#board li[data-testid="list-wrapper"]:nth-child(4)`);
  }

  get boardListMenuBtn() {
    return this.newBoardList.$(`button[data-testid="list-edit-menu-button"]`);
  }

  get boardListOrderByBtn() {
    return $(
      '.atlaskit-portal-container section[data-testid="list-actions-popover"] ul > li:nth-child(5) > button'
    );
  }

  optionToOrderByBtn(option ) {
    return $(
      `.atlaskit-portal-container section[data-testid="list-actions-popover"] ul > li:nth-child(${option}) a`
    );
  }

  // Board card
  get addCardActionBtn() {
    return this.newBoardList.$('button[data-testid="list-add-card-button"]');
  }

  get listCardInput() {
    return this.newBoardList.$('textarea[data-testid="list-card-composer-textarea"]');
  }

  // Board Menu
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
    return $(
      'button[data-testid="close-board-delete-board-button"]'
    );
  }

  get confirmDeleteBoardBtn() {
    return $(
      'section button[data-testid="close-board-delete-board-confirm-button"]'
    );
  }
}

module.exports = BoardComponent;
