const BaseComponent = require("../common/base.component");

class HomeComponent extends BaseComponent {
  constructor() {
    super("div#BXP-APP");
  }

  get singInButton() {
    return this.rootEl.$("a[data-uuid='MJFtCCgVhXrVl7v9HA7EH_login']");
  }

}

module.exports = HomeComponent;