const BasePage = require("./base.page");
const LandingComponent = require("../components/landing/landing.component");

class LandingPage extends BasePage {
  constructor() {
    super("/es");
    this.landing = new LandingComponent();
  }

  async clickOnSingInButton() {
    await this.landing.singInButton.click();
  }

}

module.exports = LandingPage;
