const BaseComponent = require("../common/base.component");

class HeaderComponent extends BaseComponent {
  constructor() {
    super('#header[data-testid="authenticated-header"]');
  }

  get homeBoardLink() {
    return this.rootEl.$("a[aria-label='Volver al inicio']");
  }

  get createMenuBtn() {
    return this.rootEl.$("button[data-testid='header-create-menu-button']");
  }

  get searchInput() { 
    return $("input[data-test-id='search-dialog-input']");
  }

  get homeButton() {
    return this.rootEl.$("a[aria-label='Volver al inicio']");
  }

}

module.exports = HeaderComponent;
