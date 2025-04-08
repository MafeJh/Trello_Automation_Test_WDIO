import { browser } from '@wdio/globals';

class BasePage {
  constructor(private url: string) {
    this.url = url;
  }

  open() {
    return browser.url(this.url);
  }
}

export default BasePage;
