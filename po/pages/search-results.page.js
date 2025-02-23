const BasePage = require("./base.page");
const SearchResultsComponent = require("../components/search-results/search-results.component");

class SearchResultsPage extends BasePage {
  constructor() {
    super('/');
    this.searchResults = new SearchResultsComponent();
  }

  async verifyBoardLinkIsDisplayed() {
    await this.searchResults.boardLink.waitForDisplayed({ timeout: 10000 });
    await expect(this.searchResults.boardLink.getText()).toEqual('Bootcamp');
  }

  async clickOnBoard() {
    await this.searchResults.boardLink.click();
  }
}

module.exports = SearchResultsPage;
