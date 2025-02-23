const BaseComponent = require("../common/base.component");

class SearchResultsComponent extends BaseComponent {
  constructor() {
    super("#content");
  }

  get boardLink() {
    return this.rootEl.$('a[data-testid="advanced-search-board-result-item"]');
  }


}

module.exports = SearchResultsComponent;