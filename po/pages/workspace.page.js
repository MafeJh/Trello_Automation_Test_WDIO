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

  async changeNameAndDescription() {
    await this.workspace.name.setValue("Mafe's workspace");
    await this.workspace.description.setValue(
      "This space is for learning about test automation with JavaScript."
    );
  }

  async saveChanges() {
    await this.workspace.saveButton.click();
  }

  async verifyNameAndDescription() {
    const name = await this.workspace.workSpaceName.getText();
    const description = await this.workspace.workSpaceDescription.getText();

    await expect(name).toMatch("Mafe's workspace");
    await expect(description).toMatch(
      "This space is for learning about test automation with JavaScript."
    );
  }
}

export default WorkspacePage;
