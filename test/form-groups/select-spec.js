describe('select', () => {
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
    expect($('[data-form-group-id="group1"]').style.visibility).toEqual('');
    expect($('[data-form-group-id="group2"]').style.visibility).toEqual('hidden');

    $('option[value="group2"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($('[data-form-group-id="group1"]').style.visibility).toEqual('hidden');
    expect($('[data-form-group-id="group2"]').style.visibility).toEqual('');
  });
});
