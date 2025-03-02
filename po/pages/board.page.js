const BasePage = require("./base.page");
const BoardComponent = require("../components/board/board.component");
const WorkSpaceComponent = require("../components/common/workspace.component");

class BoardPage extends BasePage {
  constructor() {
    super("/es");
    this.board = new BoardComponent();
    this.workSpace = new WorkSpaceComponent();
  }

  async waitForBoardPage() {
    await this.board.boardTitle.waitForDisplayed({ timeout: 20000 });
  }

  async ensureBoardIsOpen(expectedTitle) {
    await this.waitForBoardPage();
    const actualTitle = await this.board.boardTitle.getText();
    await expect(actualTitle).toMatch(expectedTitle);
    if (actualTitle !== expectedTitle) {
      console.log(`El usuario no está en el tablero ${expectedTitle}. Redirigiendo...`);
      await this.openBoardFromDashboard(expectedTitle);
    }
  }
 //HACER BUSQUEDA
  async openBoardFromDashboard(boardName) {
    await header.searchBoard(boardName);  // Usa la barra de búsqueda para encontrar el tablero
    await header.selectBoardFromResults(boardName); // Clic en el tablero correcto
  }

  async validateEndpointBoardsTitle() {
    await expect(browser).toHaveUrl(
      expect.stringMatching(new RegExp("/bootcamp$"))
    );
  }

  async clickOnNewBoardListAction() {
    await this.board.addBoardListActionBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.addBoardListActionBtn.click();
  }

  async typeBoardListName(boardName) {
    await this.board.boardListInput.waitForDisplayed({ timeout: 10000 });
    await this.board.boardListInput.click();
    await this.board.boardListInput.setValue(boardName);
    await browser.keys('Enter');
  }
  
  async verifyNewBoardIsDisplayed(boardName) {
    await this.board.newBoardList.waitForDisplayed({ timeout: 10000 });
    await expect(await this.board.newBoardList).toBeDisplayed();
    await expect(await this.board.newBoardList).toHaveText(expect.stringContaining(boardName));
  }

  async createBoardList(boardListName) {
    await browser.pause(1000);
    await this.clickOnNewBoardListAction();
    await this.typeBoardListName(boardListName);
    await this.verifyNewBoardIsDisplayed(boardListName);
  }

  async clickOnNewCardAction() {
    await this.board.addCardActionBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.addCardActionBtn.click();
  }

  async typeBoardCardName(cardName) {
    await this.board.listCardInput.waitForDisplayed({ timeout: 10000 });
    await this.board.listCardInput.setValue(cardName);
    await browser.keys('Enter');
  }

  async createCardOnList(cardNames) {
    await this.clickOnNewCardAction();
    for (const cardName of cardNames) {
      await this.typeBoardCardName(cardName);
      await browser.pause(1000);
    }
  }

  async openListMenu() {
    await this.board.boardListMenuBtn.waitForDisplayed({ timeout: 15000 });
    await this.board.boardListMenuBtn.click();
  }

  async clickOnOrderCardsBy() {
    await this.board.boardListOrderByBtn.waitForDisplayed({ timeout: 15000 });
    await this.board.boardListOrderByBtn.click();
  }

  async clickOnOptionToOrderBy(orderBy) {
    // MostRecent: 1, LessRecent: 2, Alphabetically: 3,
    await this.board.optionToOrderByBtn(orderBy).waitForDisplayed({ timeout: 15000 });
    await this.board.optionToOrderByBtn(orderBy).click();
  }

  async verifyOrder() {
    // TODO: Grab the list and check for the order of the elements
  }

  
  async filterCreatedCardsBy(orderBy) {
    await this.openListMenu();
    await this.clickOnOrderCardsBy();
    await this.clickOnOptionToOrderBy(orderBy);
  }

  // Board Menu
  async openBoardMenu() {
    await this.board.boardMenu.waitForDisplayed({ timeout: 10000 });
    await this.board.boardMenuBtn.click();
  }

  async closeCurrentBoard() {
    await this.board.closeBoardBtn.waitForDisplayed({ timeout: 15000 });
    await this.board.closeBoardBtn.click();
  }

  async confirmCloseCurrentBoard() {
    await this.board.confirmCloseBoardBtn.waitForDisplayed({ timeout: 15000 });
    await this.board.confirmCloseBoardBtn.click();
  }

  async deleteCurrentBoard() {
    await this.board.deleteBoardBtn.waitForDisplayed({ timeout: 15000 });
    await this.board.deleteBoardBtn.waitForEnabled({ timeout: 15000 });
    await this.board.deleteBoardBtn.click();
  }

  async confirmDeleteCurrentBoard() {
    await this.board.confirmDeleteBoardBtn.waitForDisplayed({
      timeout: 15000,
    });
    await this.board.confirmDeleteBoardBtn.click();
  }

  async isAddACardButtonPresent() {
    return await this.board.addACardButton.isDisplayed();
  }

  async firstCardIsPresentAndHaveText(expectedText) {
    await this.board.firstCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);  
    await expect(this.board.firstCard).toHaveText(expectedText);
}

async secondCardIsPresentAndHaveText(expectedText) {
    await this.board.secondCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);
    await expect(this.board.secondCard).toHaveText(expectedText);
}

async thirdCardIsPresentAndHaveText(expectedText) {
    await this.board.thirdCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);
    await expect(this.board.thirdCard).toHaveText(expectedText);
}


async allCardsArePresentWithCorrectText(cardName1, cardName2,cardName3) {
  await this.firstCardIsPresentAndHaveText(cardName1);
  await this.secondCardIsPresentAndHaveText(cardName2);
  await this.thirdCardIsPresentAndHaveText(cardName3);
}

  async openWorkSpace() { 
    await this.workSpace.workSpaceSettings.waitForDisplayed({ timeout: 5000 });
    await this.workSpace.workSpaceSettings.click();

    await this.workSpace.workSpaceSettingsPopover.waitForDisplayed({ timeout: 5000 });
    await this.workSpace.workSpaceSettingsPopover.click();
}


  



  // async deleteCurrentBoard() {
  //   // Open Board Menu
  //   await this.openBoardMenu();
  //   // Close current board
  //   await this.closeCurrentBoard();
  //   await this.confirmCloseCurrentBoard();
  //   // Delete current board
  //   await this.deleteCurrentBoard();
  //   await this.confirmDeleteCurrentBoard();
  // }

}

module.exports = BoardPage;
