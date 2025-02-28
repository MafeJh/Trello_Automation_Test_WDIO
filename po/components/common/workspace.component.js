const BaseComponent = require("../common/base.component");

class WorkSpaceComponent extends BaseComponent {
  constructor() {
    super('[id="content"]');
  }

  get workSpaceOption() {
    return $('[data-testid="workspace-detail-name"] p');
  }

  get workSpaceSettings() {
    return $('[data-testid="admin-settings-dropdown-button"] span.see8N96uJ7JSJZ');
  }

  get workSpaceSettingsPopover() {
    return $('a[data-testid="popover-settings-button"] span.BmRHtH7FIX0jcL');
  }

  
  get editWorkSpace() {
    return this.rootEl.$('span[data-testid="EditIcon"]');
  }


  get name(){
    return $('input[data-testid="workspace-display-name"]');
  }

}

module.exports = WorkSpaceComponent;
