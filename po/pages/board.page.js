const BasePage = require("./base.page");
const BoardComponent = require("../components/board/board.component");

class BoardPage extends BasePage {
  constructor() {
    super("/es");
    this.board = new BoardComponent();
  }

  async validateBoardsTitle() {
    await this.board.boardTitle.waitForDisplayed({ timeout: 10000 });
    const titleText = await this.board.boardTitle.getText();
    await expect(titleText).toMatch("Bootcamp");
  }

  async validateEndpointBoardsTitle() {
    await expect(browser).toHaveUrl(
      expect.stringMatching(new RegExp("/bootcamp$"))
    );
  }

  async openBoardMenu() {
    await this.board.boardMenuBtn.click();
    await this.board.boardMenu.waitForDisplayed({ timeout: 10000 });
  }

  async closeCurrentBoard() {
    await this.board.closeBoardBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.closeBoardBtn.click();
  }

  async confirmCloseCurrentBoard() {
    await this.board.confirmCloseBoardBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.confirmCloseBoardBtn.click();
  }

  async deleteCurrentBoard() {
    await this.board.deleteBoardBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.deleteBoardBtn.click();
  }

  async confirmDeleteCurrentBoard() {
    await this.board.confirmDeleteBoardBtn.waitForDisplayed({
      timeout: 10000,
    });
    await this.board.confirmDeleteBoardBtn.click();
  }
}

module.exports = BoardPage;
