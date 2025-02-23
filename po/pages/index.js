const LandingPage = require("./landing.page");
const HomeBoardsPage = require("./home-boards.page");
const SignInPage = require("./sign-in.page");
const ProfileAndVisibilityPage = require("./profile-and-visibility.page");
const HeaderPage = require("./header.page");
const BoardPage = require("./board.page");
/**
 *
 * @param {*} page {'Home'}
 * @returns {HomePage}
 */
// 'pages' function receive a page argument to return the instance of HomePage
// HomePage has access to all the elements in the form (selector of those elements)
function pages(page) {
  const items = {
    landing: new LandingPage(),
    homeBoards: new HomeBoardsPage(),
    signIn: new SignInPage(),
    profileAndVisibility: new ProfileAndVisibilityPage(),
    header: new HeaderPage(),
    board: new BoardPage(),
  };
  return items[page];
}

module.exports = { pages };
