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
}

module.exports = ProfileAndVisibilityComponent;