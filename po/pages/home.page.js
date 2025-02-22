const BasePage = require("./base.page");
const HomeComponent = require("../components/home/home.component");

class HomePage extends BasePage {
  constructor() {
    super("/es");
    this.home = new HomeComponent();
  }

  async clickOnSingInButton() {
    await this.home.singInButton.click();
  }

}

module.exports = HomePage;
