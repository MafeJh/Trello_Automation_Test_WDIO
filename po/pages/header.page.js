const BasePage = require("./base.page");
const HeaderComponent = require("../components/common/header.component");
const BoardPopoverComponent = require("../components/common/board-popover.component");

class HeaderPage extends BasePage {
  constructor() {
    super("/");
    this.header = new HeaderComponent();
    this.boardPopover = new BoardPopoverComponent();
  }

  async openCreateBoardMenu() {
    await this.header.createMenuBtn.waitForDisplayed({ timeout: 10000 });
    await this.header.createMenuBtn.click();
  }

  async clickOnCreateBoard() {
    await this.boardPopover.createBoardBtn.waitForDisplayed({ timeout: 10000 });
    await this.boardPopover.createBoardBtn.click();
  }

  async verifyCreateMenuIsDisplayed() {
    await this.boardPopover.rootEl.waitForDisplayed({ timeout: 10000, withinViewport: true });
  }

  async selectBackground() {
    await this.boardPopover.background.click();
  }

  async typeBoardName(boardName) {
    await this.boardPopover.titleInput.waitForEnabled({ timeout: 10000, withinViewport: true });
    await this.boardPopover.titleInput.setValue(boardName);
  }

  async clickOnCreateButton() {
    await this.boardPopover.createButton.waitForEnabled({ timeout: 10000, withinViewport: true });
    await this.boardPopover.createButton.click();
  }

  async goToHomeBoards() {
    await this.header.homeBoardLink.waitForDisplayed({ timeout: 10000, withinViewport: true });
    await this.header.homeBoardLink.click();
  }

  async createNewBoard(boardName) {
    await this.openCreateBoardMenu();
    await this.verifyCreateMenuIsDisplayed();
    await this.clickOnCreateBoard();
    await this.selectBackground();
    await this.typeBoardName(boardName);
    await this.clickOnCreateButton();
  }

  async clickOnHomeButton(){
    await this.header.homeButton.click();
  }

  async typeBoardsName(){
    await this.header.searchInput.waitForDisplayed({ timeout: 10000, withinViewport: true });
    await this.header.searchInput.click();
    await this.header.searchInput.setValue("Bootcamp");
  }
}

module.exports = HeaderPage;
