const HomePage = require("./home.page");
const BoardsPage = require("./boards.page");
const LogInPage = require("./logIn.page");
const ProfileAndVisibilityPage = require("./profileAndVisibility.page");
const HeaderPage = require("./header.page");
const CreateBoardPage = require("./createBoard.page");
/**
 *
 * @param {*} page {'Home'}
 * @returns {HomePage}
 */
// 'pages' function receive a page argument to return the instance of HomePage
// HomePage has access to all the elements in the form (selector of those elements)
function pages(page) {
  const items = {
    home: new HomePage(),
    board: new BoardsPage(),
    login: new LogInPage(),
    profileAndVisibility: new ProfileAndVisibilityPage(),
    header: new HeaderPage(),
    createBoard: new  CreateBoardPage()
  };
  return items[page];
}

module.exports = { pages };
