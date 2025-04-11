import { assert } from 'chai';
import { browser } from '@wdio/globals';
import BasePage from './base.page';
import ProfileAndVisibilityComponent from '../components/profile-and-visibility/profile-and-visibility.component';

class ProfileAndVisibilityPage extends BasePage {
  profileAndVisibility: ProfileAndVisibilityComponent;

  constructor() {
    super('/es');
    this.profileAndVisibility = new ProfileAndVisibilityComponent();
  }

  async enterUsername(username: string) {
    await this.profileAndVisibility.usernameInput.setValue(username);
  }

  async enterBiography(biographyDescription: string) {
    await this.profileAndVisibility.biographyInput.setValue(
      biographyDescription,
    );
  }

  async clickOnSaveButton() {
    await this.profileAndVisibility.saveButton.click();
  }

  async validateEndpointUsername(username: string) {
    const currentUrl = await browser.getUrl();
    const regex = new RegExp(`/${username}`);
    const errorMessage = `URL does not end in '/${username}'`;

    assert.match(currentUrl, regex, errorMessage);
    currentUrl.should.match(regex, errorMessage);
  }

  async updateProfile(username: string, biography: string) {
    await this.enterUsername(username);
    await this.enterBiography(biography);
    await this.clickOnSaveButton();
  }

  async validateAlertSaved() {
    await this.profileAndVisibility.alertSaved.waitForExist({ timeout: 10000 });
    
    const alertText = await this.profileAndVisibility.alertSaved.getText();

    assert.strictEqual(alertText, 'Guardado');
  }
}

export default ProfileAndVisibilityPage;
