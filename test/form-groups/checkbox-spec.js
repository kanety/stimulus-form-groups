import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

describe('checkbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <label><input type="checkbox" data-action="form-groups#toggle">group1</label>
        <div style="display: none;" data-form-group-id="true">
          <p>group1 content</p>
        </div>
      </div>
    `;
  });

  it('toggles visibility', () => {
    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').style.display).toEqual('');

    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').style.display).toEqual('none');
  });
});
