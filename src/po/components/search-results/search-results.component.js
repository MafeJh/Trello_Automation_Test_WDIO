import BaseComponent from "../common/base.component";

class SearchResultsComponent extends BaseComponent {
  constructor() {
    super("#content");
  }

  get boardLink() {
    return this.rootEl.$('a[data-testid="advanced-search-board-result-item"]');
  }


}

export default SearchResultsComponent;