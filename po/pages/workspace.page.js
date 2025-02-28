const BasePage = require("./base.page");
const WorkspaceComponent = require("../components/common/workspace.component");

class WorkspacePage extends BasePage {
  constructor() {
    super("/es");
    this.workspace = new WorkspaceComponent();
  }

  async clickOnEditWorkSpace() {
    await this.workspace.editWorkSpace.click();
  }

}

module.exports = WorkspacePage;
