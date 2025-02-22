const BaseComponent = require("../common/base.component");

class BoardsComponent extends BaseComponent {
  constructor() {
    super("body");
  }

  get accountButton(){
    return this.rootEl.$("button[data-testid='header-member-menu-button']");
  }
  
  get emailElement() {
    return this.rootEl.$("div[data-testid='account-menu'] .Ej7WGzTnvdxL7I");
  }

  get profileAndVisibility(){
    return this.rootEl.$("a[data-testid='account-menu-profile']  span.BmRHtH7FIX0jcL");
  }
}

module.exports = BoardsComponent;