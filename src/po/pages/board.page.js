import BasePage from "./base.page";
import BoardComponent from "../components/board/board.component";
import WorkSpaceComponent from "../components/common/workspace.component";
import FilterComponent from "../components/board/filter.component";

export default class BoardPage extends BasePage {
  constructor() {
    super("/es");
    this.board = new BoardComponent();
    this.workSpace = new WorkSpaceComponent();
    this.filter = new FilterComponent();
  }

  async ensureBoardIsOpen(expectedTitle) {
    await this.board.boardTitle.waitForDisplayed({ timeout: 20000 });

    const currentTitle = await this.board.boardTitle.getText();

    expect(currentTitle).to.match(new RegExp(expectedTitle));

    if (currentTitle !== expectedTitle) {
      console.log(
        `El usuario no está en el tablero ${expectedTitle}. Redirigiendo...`
      );
      await this.openBoardFromDashboard(expectedTitle);
    }
  }

  async validateEndpointBoardsTitle() {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/bootcamp"),
      {
        timeout: 10000,
        timeoutMsg: "La URL no cambió a la esperada con '/bootcamp'",
      }
    );

    const url = await browser.getUrl();

    expect(url).to.include("/bootcamp");
    assert.include(url, "/bootcamp", "La URL no contiene '/bootcamp'");
    url.should.include("/bootcamp");
  }

  async clickOnNewBoardListAction() {
    await this.board.addBoardListActionBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.addBoardListActionBtn.click();
  }

  async typeBoardListName(boardName) {
    await this.board.boardListInput.waitForDisplayed({ timeout: 10000 });
    await this.board.boardListInput.click();
    await this.board.boardListInput.setValue(boardName);
    await browser.keys("Enter");
  }

  async verifyNewBoardIsDisplayed(boardName) {
    await this.board.newBoardList.waitForDisplayed({ 
      timeout: 200000,
      timeoutMsg: 'New board was not displayed', 
    });

    const actualText = await this.board.newBoardList.getText();

    expect(
      await this.board.newBoardList.isDisplayed(),
      "El nuevo tablero no está visible"
    ).to.be.true;
    expect(actualText, "El nombre del tablero no coincide").to.include(
      boardName
    );

    assert.isTrue(
      await this.board.newBoardList.isDisplayed(),
      "El nuevo tablero no está visible"
    );
    assert.include(actualText, boardName, "El nombre del tablero no coincide");

    actualText.should.include(boardName);
  }

  async validateEachCardIsPresentAndHaveText(cardNames) {
    for (let position = 0; position < cardNames.length; position++) {
      await this.isCardPresentAndHaveText(position + 1, cardNames[position]);
    }
  }

  async isCardPresentAndHaveText(position, expectedCardName) {
    await this.board.cardElement(position).waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);

    const currentText = await this.board.cardElement(position).getText();

    expect(currentText).to.equal(expectedCardName);
    assert.strictEqual(
      currentText,
      expectedCardName,
      `Text does match with the card in position ${position}`
    );
    currentText.should.equal(expectedCardName);
  }

  async openWorkSpace() {
    await this.workSpace.workSpaceSettings.waitForDisplayed({ timeout: 5000 });
    await this.workSpace.workSpaceSettings.click();

    await this.workSpace.workSpaceSettingsPopover.waitForDisplayed({
      timeout: 5000,
    });
    await this.workSpace.workSpaceSettingsPopover.click();
  }

  async clickOnNewCardAction() {
    await this.board.addCardActionBtn.waitForDisplayed({ timeout: 10000 });
    await this.board.addCardActionBtn.click();
  }

  async isAddACardButtonPresent() {
    await this.board.addCardActionBtn.waitForExist({ timeout: 10000 });
    await this.board.addCardActionBtn.waitForDisplayed({ timeout: 10000 });

    const isDisplayed = await this.board.addCardActionBtn.isDisplayed();
    console.log(`El botón está visible: ${isDisplayed}`); // Debugging

    assert.isTrue(isDisplayed, "El botón 'Add a card' no está presente.");
  }

  async typeBoardCardName(cardName) {
    await this.board.listCardInput.waitForDisplayed({ timeout: 20000 });
    await this.board.listCardInput.setValue(cardName);
    await browser.keys("Enter");
  }

  async createCardOnList(cardNames) {
    await this.clickOnNewCardAction();
    for (const cardName of cardNames) {
      await this.typeBoardCardName(cardName);
      await browser.pause(500);
    }
  }

  async openFilterPopover() {
    await this.board.filterPopoverBtn.click();
  }

  async checkStatusMarkAsCompleted() {
    await this.filter.markStatusAsCompleted.waitForDisplayed({ timeout: 1000 });
    await this.filter.markStatusAsCompleted.click();
  }

  async checkStatusMarkAsNotCompleted() {
    await this.filter.markStatusAsNotCompleted.waitForDisplayed({
      timeout: 1000,
    });
    await this.filter.markStatusAsNotCompleted.click();
  }

  async getTextFromQuantityOfMatchesMessage() {
    await this.board.quantityOfMatchesMessage.waitForDisplayed({
      timeout: 10000,
    });
    return await this.board.quantityOfMatchesMessage.getText();
  }

  async validateFilterResult(status) {
    const expectedCounts = {
      markAsCompleted: 0,
      markAsNotCompleted: 3,
    };

    const actualMessage = await this.getTextFromQuantityOfMatchesMessage();
    const expectedMessage = `Los filtros coinciden con ${expectedCounts[status]} tarjetas`;

    // Validaciones con los tres métodos de Chai
    expect(actualMessage).to.equal(expectedMessage);
    assert.strictEqual(
      actualMessage,
      expectedMessage,
      "El mensaje de coincidencia no es el esperado"
    );
    actualMessage.should.equal(expectedMessage);
  }
}
