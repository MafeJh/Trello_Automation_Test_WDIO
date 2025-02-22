const BaseComponent = require("../common/base.component");

class LogInComponent extends BaseComponent {
  constructor() {
    super("#form-login");
  }

  get emailInput() {
    return this.rootEl.$("#username");
  }

  get continueButton() {
    return this.rootEl.$("button#login-submit");
  }

  get passwordInput() {
    return this.rootEl.$("#password");
  }

  get logInButton() {
    return this.rootEl.$("#login-submit");
  }

}

module.exports = LogInComponent;