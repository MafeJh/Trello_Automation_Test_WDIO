import LandingPage from "./landing.page";
import HomeBoardsPage from "./home-boards.page";
import SignInPage from "./sign-in.page";
import ProfileAndVisibilityPage from "./profile-and-visibility.page";
import HeaderPage from "./header.page";
import BoardPage from "./board.page";
import WorkspacePage from "./workspace.page";
/**
 *
 * @param {*} page {'Home'}
 * @returns {HomePage}
 */
// 'pages' function receive a page argument to return the instance of HomePage
// HomePage has access to all the elements in the form (selector of those elements)
export function pages(page) {
  const items = {
    landing: new LandingPage(),
    homeBoards: new HomeBoardsPage(),
    signIn: new SignInPage(),
    profileAndVisibility: new ProfileAndVisibilityPage(),
    header: new HeaderPage(),
    board: new BoardPage(),
    workspace: new WorkspacePage(),
  };
  return items[page];
}
