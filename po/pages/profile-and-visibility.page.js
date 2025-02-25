const BasePage = require("./base.page");
const ProfileAndVisibilityComponent = require("../components/profileAndVisibility/profileAndVisibility.component");

class ProfileAndVisibilityPage extends BasePage {
  constructor() {
    super("/es");
    this.profileAndVisibility = new ProfileAndVisibilityComponent();
  }

  async enterUsername() {
    await this.profileAndVisibility.usernameInput.setValue("mafejimenezh");
  }

  async enterBiography() {
    await this.profileAndVisibility.biographyInput.setValue("Hola! Bienvenido a mi trello de QA Automation");
  }

  async clickOnSaveButton() {
    await this.profileAndVisibility.saveButton.click();
  }

  async validateEndpointUsername() {
    await expect(browser).toHaveUrl(expect.stringMatching(new RegExp('/mafejimenezh$')));
  }

  async updateProfile() {
    await this.enterUsername();
    await this.enterBiography();
    await this.clickOnSaveButton();
  }

  async validateAlertSaved() {
    await this.profileAndVisibility.alertSaved.waitForExist({ timeout: 5000 });
    await expect(this.profileAndVisibility.alertSaved).toHaveText("Guardado", { timeout: 5000 });
}


}

module.exports = ProfileAndVisibilityPage;
