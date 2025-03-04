import BaseComponent from "../common/base.component";

class FilterComponent extends BaseComponent {
  constructor() {
    super("div.atlaskit-portal-container section");
  }

  get markStatusAsCompleted() {
    return this.rootEl.$('div:nth-child(5) > ul > li:nth-child(1) > label');
  }

  get markStatusAsNotCompleted() {
    return this.rootEl.$('div:nth-child(5) > ul > li:nth-child(2) > label');
  }

}

export default FilterComponent;
