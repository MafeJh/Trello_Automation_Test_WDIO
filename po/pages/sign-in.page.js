const BasePage = require("./base.page");
const LogInComponent = require("../components/sign-in/sign-in.component");

class LogInPage extends BasePage {
  constructor() {
    super("/es");
    this.logIn = new LogInComponent();
  }

  async typeInEmailInput() {
    await this.logIn.emailInput.waitForDisplayed();
    await this.logIn.emailInput.setValue("mafejh274@gmail.com");
}

  async clickOnContinueButton(){
    await this.logIn.continueButton.click();
  }

async typeInPasswordInput() {
  await this.logIn.passwordInput.waitForDisplayed();
  await this.logIn.passwordInput.setValue("ContraseñaEPAM");
}

async clickOnLogInButton() {
  await this.logIn.logInButton.click();
}
}

module.exports = LogInPage;
