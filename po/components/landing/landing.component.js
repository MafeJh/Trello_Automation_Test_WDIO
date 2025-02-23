const BaseComponent = require("../common/base.component");

class LandingComponent extends BaseComponent {
  constructor() {
    super("div#BXP-APP");
  }

  get singInButton() {
    return this.rootEl.$("a[data-uuid='MJFtCCgVhXrVl7v9HA7EH_login']");
  }

}

module.exports = LandingComponent;