class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }

  item(parentElement, options, option) {
    return parentElement.$(options[option.toLowerCase()]);
  }
}

module.exports = BaseComponent;
