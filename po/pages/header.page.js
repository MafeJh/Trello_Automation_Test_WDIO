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
    await this.boardPopover.createBoardBtn.waitForDisplayed({ timeout: 10000 }); // Espera hasta 10s
    await this.boardPopover.createBoardBtn.click();
  }

  async verifyCreateMenuIsDisplayed() {
    await this.boardPopover.rootEl.waitForDisplayed({ timeout: 10000, withinViewport: true });
  }

  async selectBackground() {
    await this.boardPopover.background.click();
  }

  async typeTitleInput() {
    await this.boardPopover.titleInput.setValue('Bootcamp');
  }

  async clickOnCreateButton() {
    await this.boardPopover.createButton.waitForEnabled({ timeout: 10000, withinViewport: true });
    await this.boardPopover.createButton.click();
  }

  async goToHomeBoards() {
    await this.header.homeBoardLink.click();
  }

  async searchForBoard(boardTitle) {
    const searchInput = $('input[data-test-id="search-dialog-input"]');
    console.log("¿El elemento existe en el DOM?", await this.header.searchInput.isExisting());
    console.log("¿El elemento es visible?", await this.header.searchInput.isDisplayed());

    console.log("¿El elemento existe en el DOM?", await searchInput.isExisting());
    console.log("¿El elemento es visible?", await searchInput.isDisplayed());

    // await searchInput.waitForDisplayed({ timeout: 10000, withinViewport: true });
    // await searchInput.setValue(boardTitle);
    // await browser.keys("Enter");
  }


}

module.exports = HeaderPage;
