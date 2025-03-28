import BasePage from "./base.page";
import WorkspaceComponent from "../components/common/workspace.component";

class WorkspacePage extends BasePage {
  constructor() {
    super("/es");
    this.workspace = new WorkspaceComponent();
  }

  async clickOnEditWorkSpace() {
    await this.workspace.editWorkSpace.click();
  }

  async changeNameAndDescription(name, description) {
    await this.workspace.name.setValue(name);
    await this.workspace.description.setValue(description);
  }

  async saveChanges() {
    await this.workspace.saveButton.click();
  }

  async verifyNameAndDescription() {
    const name = await this.workspace.workSpaceName.getText();
    const description = await this.workspace.workSpaceDescription.getText();

    expect(name).to.match(/Mafe's workspace/);
    expect(description).to.match(
      /This space is for learning about test automation with JavaScript./,
    );
  }

  async typeBoardsName(boardsName) {
    await this.workspace.searchInput.waitForDisplayed({
      timeout: 10000,
      withinViewport: true,
    });
    await this.workspace.searchInput.setValue(boardsName);
  }

  async openBoardCardLink() {
    await this.workspace.boardCardLink.waitForDisplayed({
      timeout: 10000,
      withinViewport: true,
    });
    await this.workspace.boardCardLink.click();
  }
}

export default WorkspacePage;
