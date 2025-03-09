import BasePage from "./base.page";
import LandingComponent from "../components/landing/landing.component";

class LandingPage extends BasePage {
  constructor() {
    super("/es");
    this.landing = new LandingComponent();
  }

  async clickOnSingInButton() {
    await this.landing.singInButton.click();
  }
}

export default LandingPage;
