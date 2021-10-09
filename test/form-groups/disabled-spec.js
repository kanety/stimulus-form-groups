import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

describe('checkbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups"
           data-form-groups-mode-value="disabled">
        <select data-action="form-groups#toggle"
                data-form-groups-mode-param="disabled">
          <option value=""></option>
          <option value="group1">group1</option>
          <option value="group2">group2</option>
        </select>
        <div data-form-group-id="group1">
          <p><input type="text" disabled></p>
        </div>
        <div data-form-group-id="group2">
          <p><textarea disabled></textarea></p>
        </div>
      </div>
    `;
  });

  it('toggles disabled', () => {
    $('option[value="group1"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"] input').disabled).toEqual(false);
    expect($('[data-form-group-id="group2"] textarea').disabled).toEqual(true);

    $('option[value="group2"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"] input').disabled).toEqual(true);
    expect($('[data-form-group-id="group2"] textarea').disabled).toEqual(false);
  });
});
