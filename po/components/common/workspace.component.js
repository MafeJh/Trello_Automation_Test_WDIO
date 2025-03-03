import BaseComponent from "../common/base.component";

class WorkSpaceComponent extends BaseComponent {
  constructor() {
    super('[id="content"]');
  }

  get workSpaceOption() {
    return $('[data-testid="workspace-detail-name"] p');
  }

  get workSpaceSettings() {
    return $('[data-testid="admin-settings-dropdown-button"]');
  }

  get workSpaceSettingsPopover() {
    return $('a[data-testid="popover-settings-button"] span.BmRHtH7FIX0jcL');
  }

  get editWorkSpace() {
    return this.rootEl.$('span[data-testid="EditIcon"]');
  }

  get name() {
    return this.rootEl.$('input[data-testid="workspace-display-name"]');
  }

  get description() {
    return this.rootEl.$('textarea[id="desc"]');
  }

  get saveButton() {
    return this.rootEl.$('button[type="submit"]');
  }

  get workSpaceName() {
    return this.rootEl.$("h2.SiP6d2d_8FAAkC");
  }

  get workSpaceDescription() {
    return this.rootEl.$("div.ak-renderer-document p");
  }
}

export default WorkSpaceComponent;
