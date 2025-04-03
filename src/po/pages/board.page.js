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
  }

  async validateEndpointBoardsTitle(boardName) {
    const expectedURL = `/${boardName}`;

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(expectedURL),
      {
        timeout: 10000,
        timeoutMsg: `URL did not matched the expected '${expectedURL}'`,
      },
    );

    const currentURL = await browser.getUrl();

    expect(currentURL).to.include(expectedURL);
    assert.include(currentURL, expectedURL);
    currentURL.should.include(expectedURL);
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
    await browser.keys("Esc");
  }

  async verifyNewBoardIsDisplayed(boardName) {
    await this.board.newBoardList.waitForDisplayed({
      timeout: 200000,
      timeoutMsg: "New board was not displayed",
    });

    assert.isTrue(await this.board.newBoardList.isDisplayed());

    const actualText = await this.board.newBoardList.getText();

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
      `Text does match with the card in position ${position}`,
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
    await this.board.addCardActionBtn.waitForDisplayed({ timeout: 10000 });

    const isDisplayed = await this.board.addCardActionBtn.isDisplayed();

    assert.isTrue(isDisplayed, "Button 'Añade una tarjeta' is not present.");
  }

  async typeBoardCardName(cardName) {
    await this.board.listCardInput.waitForDisplayed({ timeout: 2000 });
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
      timeout: 10000,
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

    expect(actualMessage).to.equal(expectedMessage);
    assert.strictEqual(
      actualMessage,
      expectedMessage,
      "Message does not match with the expected one",
    );
    actualMessage.should.equal(expectedMessage);
  }
}
