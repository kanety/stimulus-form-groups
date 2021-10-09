import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

describe('radio', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <label><input type="radio" name="group" value="group1" data-action="form-groups#toggle">group1</label>
        <label><input type="radio" name="group" value="group2" data-action="form-groups#toggle">group2</label>
        <label><input type="radio" name="group" value="group3" data-action="form-groups#toggle">group3</label>
        <div style="display: none;" data-form-group-id="group1">
          <p>group1 content</p>
        </div>
        <div style="display: none;" data-form-group-id="group2">
          <p>group2 content</p>
        </div>
        <div style="display: none;" data-form-group-id="group3">
          <p>group3 content</p>
        </div>
      </div>
    `;
  });

  it('toggles visibility', () => {
    $('input[value="group1"]').click();
    expect($('[data-form-group-id="group1"]').style.display).toEqual('');
    expect($('[data-form-group-id="group2"]').style.display).toEqual('none');

    $('input[value="group2"]').click();
    expect($('[data-form-group-id="group1"]').style.display).toEqual('none');
    expect($('[data-form-group-id="group2"]').style.display).toEqual('');
  });
});
