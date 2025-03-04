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

  async waitForBoardPage() {
    await this.board.boardTitle.waitForDisplayed({ timeout: 20000 });
  }

  async ensureBoardIsOpen(expectedTitle) {
    await this.waitForBoardPage();
    const actualTitle = await this.board.boardTitle.getText();
    expect(actualTitle).to.match(new RegExp(expectedTitle));
    if (actualTitle !== expectedTitle) {
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
    console.log("Final URL:", url);

    // Validaciones con los 3 métodos de Chai
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
    await browser.waitUntil(
      async () => {
        return await this.board.newBoardList.isDisplayed();
      },
      {
        timeout: 200000,
        timeoutMsg: "El nuevo tablero no se mostró en el tiempo esperado",
      }
    );

    // Obtener el texto y limpiar espacios extra
    const actualText = await this.board.newBoardList.getText();

    // Usando expect
    expect(
      await this.board.newBoardList.isDisplayed(),
      "El nuevo tablero no está visible"
    ).to.be.true;
    expect(actualText, "El nombre del tablero no coincide").to.include(
      boardName
    );

    // Usando assert
    assert.isTrue(
      await this.board.newBoardList.isDisplayed(),
      "El nuevo tablero no está visible"
    );
    assert.include(actualText, boardName, "El nombre del tablero no coincide");

    // Usando should
    (await this.board.newBoardList.isDisplayed()).should.be.true;
    actualText.should.include(boardName);
  }

  async firstCardIsPresentAndHaveText(expectedText) {
    await this.board.firstCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);

    const actualText = await this.board.firstCard.getText();

    // Usando expect
    expect(actualText).to.equal(expectedText);

    // Usando assert
    assert.strictEqual(
      actualText,
      expectedText,
      "El texto de la primera tarjeta no coincide"
    );

    // Usando should
    actualText.should.equal(expectedText);
  }

  async secondCardIsPresentAndHaveText(expectedText) {
    await this.board.secondCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);

    const actualText = await this.board.secondCard.getText();

    // Usando expect
    expect(actualText).to.equal(expectedText);

    // Usando assert
    assert.strictEqual(
      actualText,
      expectedText,
      "El texto de la segunda tarjeta no coincide"
    );

    // Usando should
    actualText.should.equal(expectedText);
  }

  async thirdCardIsPresentAndHaveText(expectedText) {
    await this.board.thirdCard.waitForDisplayed({ timeout: 5000 });
    await browser.pause(1000);

    const actualText = await this.board.thirdCard.getText();

    // Usando expect
    expect(actualText).to.equal(expectedText);

    // Usando assert
    assert.strictEqual(
      actualText,
      expectedText,
      "El texto de la tercera tarjeta no coincide"
    );

    // Usando should
    actualText.should.equal(expectedText);
  }

  async allCardsArePresentWithCorrectText(cardName1, cardName2, cardName3) {
    await this.firstCardIsPresentAndHaveText(cardName1);
    await this.secondCardIsPresentAndHaveText(cardName2);
    await this.thirdCardIsPresentAndHaveText(cardName3);
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
    await this.board.listCardInput.waitForDisplayed({ timeout: 10000 });
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
    await this.filter.markStatusAsCompleted.click();
  }
}
