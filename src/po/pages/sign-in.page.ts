import BasePage from './base.page';
import LogInComponent from '../components/sign-in/sign-in.component';

class LogInPage extends BasePage {
  logIn: LogInComponent;

  constructor() {
    super('/es');
    this.logIn = new LogInComponent();
  }

  async typeInEmailInput(email: string) {
    await this.logIn.emailInput.waitForExist();
    await this.logIn.emailInput.setValue(email);
  }

  async clickOnContinueButton() {
    await this.logIn.continueButton.click();
  }

  async typeInPasswordInput(password: string) {
    await this.logIn.passwordInput.waitForExist();
    await this.logIn.passwordInput.setValue(password);
  }

  async clickOnLogInButton() {
    await this.logIn.logInButton.click();
  }

  async singIn(email: string, password: string) {
    await this.typeInEmailInput(email);
    await this.clickOnContinueButton();
    await this.typeInPasswordInput(password);
  }
}

export default LogInPage;
