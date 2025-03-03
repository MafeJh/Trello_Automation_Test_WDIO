import BasePage from "./base.page";
import BoardsComponent from "../components/home-boards/home-boards.component";


  class BoardsPage extends BasePage {
    constructor() {
      super("/es");
      this.boards = new BoardsComponent();
    }
  
    async validateEmail() {
      await this.boards.accountButton.waitForDisplayed({ timeout: 20000 });
      const expectedEmail = "mafejh274@gmail.com";
      await this.boards.accountButton.click();
      const emailText = await this.boards.emailElement.getText();
  
      // Usando expect
      expect(emailText).to.equal(expectedEmail, "El email mostrado no es el esperado.");
  
      // Usando assert
      assert.strictEqual(emailText, expectedEmail, "El email mostrado no coincide.");
  
      // Usando should
      emailText.should.equal(expectedEmail, "El email mostrado debería coincidir.");
    }
  
    async clickOnProfileAndVisibility() {
      await this.boards.profileAndVisibility.click();
    }
  
    async validateHomeBoardsEndpoint() {
      const currentUrl = await browser.getUrl();
  
      // Usando expect
      expect(currentUrl).to.match(/\/mafejimenezh\/boards$/, "La URL del tablero no es la esperada.");
  
      // Usando assert
      assert.match(currentUrl, /\/mafejimenezh\/boards$/, "La URL del tablero no coincide.");
  
      // Usando should
      currentUrl.should.match(/\/mafejimenezh\/boards$/, "La URL del tablero debería coincidir.");
    }
  }
  

export default BoardsPage;
