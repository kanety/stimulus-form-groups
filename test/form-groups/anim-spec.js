import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

jest.useFakeTimers();

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

  it('toggles anim', () => {
    expect($('[data-form-group-id="group1"]').matches('.st-form-groups--disable-anim')).toEqual(true);
    jest.runAllTimers();
    expect($('[data-form-group-id="group1"]').matches('.st-form-groups--disable-anim')).toEqual(false);

    $('option[value="group1"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"]').matches('.st-form-groups--fade-in')).toEqual(true);
  });
});
