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
        <div data-form-group-id='["group1", "group3"]'>
          <p>group1 content</p>
        </div>
        <div data-form-group-id='["group2", "group3"]'>
          <p>group2 content</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('option[value="group3"]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($(`[data-form-group-id='["group1", "group3"]']`).matches('.st-form-groups__group--visible')).toEqual(true);
    expect($(`[data-form-group-id='["group2", "group3"]']`).matches('.st-form-groups__group--visible')).toEqual(true);

    $('option[value=""]').selected = true;
    $('select').dispatchEvent(new Event('change'));
    expect($(`[data-form-group-id='["group1", "group3"]']`).matches('.st-form-groups__group--visible')).toEqual(false);
    expect($(`[data-form-group-id='["group2", "group3"]']`).matches('.st-form-groups__group--visible')).toEqual(false);
  });
});
