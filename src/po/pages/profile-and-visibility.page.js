import BasePage from "./base.page";
import ProfileAndVisibilityComponent from "../components/profile-and-visibility/profile-and-visibility.component";

class ProfileAndVisibilityPage extends BasePage {
  constructor() {
    super("/es");
    this.profileAndVisibility = new ProfileAndVisibilityComponent();
  }

  async enterUsername(username) {
    await this.profileAndVisibility.usernameInput.setValue(username);
  }

  async enterBiography(biographyDescription) {
    await this.profileAndVisibility.biographyInput.setValue(
      biographyDescription,
    );
  }

  async clickOnSaveButton() {
    await this.profileAndVisibility.saveButton.click();
  }

  async validateEndpointUsername(username) {
    const currentUrl = await browser.getUrl();
    const regex = new RegExp(`/${username}`);
    const errorMessage = `URL does not end in '/${username}'`;

    expect(currentUrl).to.match(regex, errorMessage);
    assert.match(currentUrl, regex, errorMessage);
    currentUrl.should.match(regex, errorMessage);
  }

  async updateProfile(username, biography) {
    await this.enterUsername(username);
    await this.enterBiography(biography);
    await this.clickOnSaveButton();
  }

  async validateAlertSaved() {
    await this.profileAndVisibility.alertSaved.waitForExist({ timeout: 5000 });
    const alertText = await this.profileAndVisibility.alertSaved.getText();
    const errorMessage = `Alert message is not the expected one`;

    expect(alertText).to.equal("Guardado", errorMessage);
    assert.strictEqual(alertText, "Guardado", errorMessage);
    alertText.should.equal("Guardado", errorMessage);
  }
}

export default ProfileAndVisibilityPage;
