import BaseComponent from "../common/base.component";

class HomeBoardsComponent extends BaseComponent {
  constructor() {
    super("body");
  }

  get accountButton() {
    return this.rootEl.$("button[data-testid='header-member-menu-button']");
  }

  get emailElement() {
    return this.rootEl.$("div[data-testid='account-menu'] .Ej7WGzTnvdxL7I");
  }

  get profileAndVisibility() {
    return this.rootEl.$(
      "a[data-testid='account-menu-profile']  span.BmRHtH7FIX0jcL",
    );
  }

  get searchInput() {
    return $("[data-test-id='search-dialog-input']");
  }

  get boardsBtn() {
    return $(
      "#content div.boards-page-board-section-header-options > a:nth-child(1)",
    );
  }
}

export default HomeBoardsComponent;
