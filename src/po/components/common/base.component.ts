import { $ } from '@wdio/globals';

class BaseComponent {
  constructor(private rootSelector: string) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }

  item(parentElement, options, option) {
    return parentElement.$(options[option.toLowerCase()]);
  }
}

export default BaseComponent;
