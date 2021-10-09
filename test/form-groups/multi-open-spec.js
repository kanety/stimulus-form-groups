import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

describe('multi-open', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <select data-action="form-groups#toggle">
          <option value=""></option>
          <option value="group1">group1</option>
          <option value="group2">group2</option>
          <option value="group3">group3</option>
        </select>
        <div style="display: none;" data-form-group-id='["group1", "group3"]'>
          <p>group1 content</p>
        </div>
        <div style="display: none;" data-form-group-id='["group2", "group3"]'>
          <p>group2 content</p>
        </div>
      </div>
    `;
  });

  it('toggles visibility', () => {
    $('option[value="group3"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($(`[data-form-group-id='["group1", "group3"]']`).style.display).toEqual('');
    expect($(`[data-form-group-id='["group2", "group3"]']`).style.display).toEqual('');

    $('option[value=""]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($(`[data-form-group-id='["group1", "group3"]']`).style.display).toEqual('none');
    expect($(`[data-form-group-id='["group2", "group3"]']`).style.display).toEqual('none');
  });
});
