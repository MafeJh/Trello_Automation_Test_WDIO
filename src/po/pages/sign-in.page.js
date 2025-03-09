import BasePage from "./base.page";
import LogInComponent from "../components/sign-in/sign-in.component";

class LogInPage extends BasePage {
  constructor() {
    super("/es");
    this.logIn = new LogInComponent();
  }

  async typeInEmailInput(email) {
    await this.logIn.emailInput.waitForDisplayed();
    await this.logIn.emailInput.setValue(email);
  }

  async clickOnContinueButton() {
    await this.logIn.continueButton.click();
  }

  async typeInPasswordInput(password) {
    await this.logIn.passwordInput.waitForDisplayed();
    await this.logIn.passwordInput.setValue(password);
  }

  async clickOnLogInButton() {
    await this.logIn.logInButton.click();
  }

  async singIn(email, password) {
    await this.typeInEmailInput(email);
    await this.clickOnContinueButton();
    await this.typeInPasswordInput(password);
  }
}

export default LogInPage;
