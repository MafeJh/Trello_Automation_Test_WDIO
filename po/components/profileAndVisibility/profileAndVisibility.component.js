const BaseComponent = require("../common/base.component");

class ProfileAndVisibilityComponent extends BaseComponent {
  constructor() {
    super("[data-testid='profile-form']");
  }

  get usernameInput() {
    return this.rootEl.$("#username");
  }

  get biographyInput(){
    return this.rootEl.$("#bio");
  }

  get saveButton(){
    return this.rootEl.$("button[type='submit']");
  }

  // get alertSaved(){
  //   return this.rootEl.$("#FlagGroup > div > div > div.YEctMXs9uZbttS > span.QMKgZFIlTLiEJN"); //#FlagGroup > div > div > div.YEctMXs9uZbttS > span.QMKgZFIlTLiEJN
  // }

  get alertSaved() {
    return $("div.YEctMXs9uZbttS > span.QMKgZFIlTLiEJN");
}

}

module.exports = ProfileAndVisibilityComponent;