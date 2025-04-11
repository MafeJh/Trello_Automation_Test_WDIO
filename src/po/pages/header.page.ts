import BasePage from './base.page';
import HeaderComponent from '../components/common/header.component';
import BoardPopoverComponent from '../components/common/board-popover.component';

class HeaderPage extends BasePage {
  header: HeaderComponent;
  boardPopover: BoardPopoverComponent;

  constructor() {
    super('/');
    this.header = new HeaderComponent();
    this.boardPopover = new BoardPopoverComponent();
  }

  async openCreateBoardMenu() {
    await this.header.createMenuBtn.waitForExist({ timeout: 10000 });
    await this.header.createMenuBtn.click();
  }

  async clickOnCreateBoard() {
    await this.boardPopover.createBoardBtn.waitForExist({ timeout: 10000 });
    await this.boardPopover.createBoardBtn.click();
  }

  async verifyCreateMenuIsDisplayed() {
    await this.boardPopover.rootEl.waitForExist({
      timeout: 10000,
      withinViewport: true,
    });
  }

  async selectBackground() {
    await this.boardPopover.background.click();
  }

  async typeBoardName(boardName: string) {
    await this.boardPopover.titleInput.waitForEnabled({
      timeout: 10000,
      withinViewport: true,
    });
    await this.boardPopover.titleInput.setValue(boardName);
  }

  async clickOnCreateButton() {
    await this.boardPopover.createButton.waitForEnabled({
      timeout: 10000,
      withinViewport: true,
    });
    await this.boardPopover.createButton.click();
  }

  async goToHomeBoards() {
    await this.header.homeBoardLink.waitForExist({
      timeout: 10000,
      withinViewport: true,
    });
    await this.header.homeBoardLink.click();
  }

  async createNewBoard(boardName: string) {
    await this.openCreateBoardMenu();
    await this.verifyCreateMenuIsDisplayed();
    await this.clickOnCreateBoard();
    await this.selectBackground();
    await this.typeBoardName(boardName);
    await this.clickOnCreateButton();
  }
}

export default HeaderPage;
