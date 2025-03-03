import BasePage from "./base.page";
import ProfileAndVisibilityComponent from "../components/profile-and-visibility/profile-and-visibility.component";
import chai from "chai";

const { expect, assert, should } = chai;
should();

class ProfileAndVisibilityPage extends BasePage {
  constructor() {
    super("/es");
    this.profileAndVisibility = new ProfileAndVisibilityComponent();
  }

  async enterUsername() {
    await this.profileAndVisibility.usernameInput.setValue("mafejimenezh");
  }

  async enterBiography() {
    await this.profileAndVisibility.biographyInput.setValue(
      "Hola! Bienvenido a mi trello de QA Automation"
    );
  }

  async clickOnSaveButton() {
    await this.profileAndVisibility.saveButton.click();
  }

  async validateEndpointUsername() {
    const currentUrl = await browser.getUrl();
    const regex = new RegExp("/mafejimenezh$");

    // Usando expect
    expect(currentUrl).to.match(regex, "La URL no termina en '/mafejimenezh'.");

    // Usando assert
    assert.match(currentUrl, regex, "La URL no termina en '/mafejimenezh'.");

    // Usando should
    currentUrl.should.match(regex, "La URL debería terminar en '/mafejimenezh'.");
  }

  async updateProfile() {
    await this.enterUsername();
    await this.enterBiography();
    await this.clickOnSaveButton();
  }

  async validateAlertSaved() {
    await this.profileAndVisibility.alertSaved.waitForExist({ timeout: 5000 });
    const alertText = await this.profileAndVisibility.alertSaved.getText();
    
    // Usando expect
    expect(alertText).to.equal("Guardado", "El mensaje de alerta no es el esperado.");
    
    // Usando assert
    assert.strictEqual(alertText, "Guardado", "El mensaje de alerta no es el esperado.");
    
    // Usando should
    alertText.should.equal("Guardado", "El mensaje de alerta debería ser 'Guardado'.");
  }
}

export default ProfileAndVisibilityPage;
