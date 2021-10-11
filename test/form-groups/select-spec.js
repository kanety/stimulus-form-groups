import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <select data-action="form-groups#toggle">
          <option value=""></option>
          <option value="group1">group1</option>
          <option value="group2">group2</option>
        </select>
        <div data-form-group-id="group1">
          <p>group1 content</p>
        </div>
        <div data-form-group-id="group2">
          <p>group2 content</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('option[value="group1"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"]').style.display).toEqual('');
    expect($('[data-form-group-id="group2"]').style.display).toEqual('none');

    $('option[value="group2"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"]').style.display).toEqual('none');
    expect($('[data-form-group-id="group2"]').style.display).toEqual('');
  });
});
