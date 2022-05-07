describe('checkbox-multi', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <label><input type="checkbox" name="cb1" value="1" data-action="form-groups#toggle">group1</label>
        <label><input type="checkbox" name="cb2" value="1" data-action="form-groups#toggle">group2</label>
        <div data-form-group-id="cb1:1">
          <p>group1 content</p>
        </div>
        <div data-form-group-id="cb2:1">
          <p>group2 content</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('input[type=checkbox][name=cb1]').click();
    expect($('[data-form-group-id="cb1:1"]').matches('.st-form-groups__group--visible')).toEqual(true);
    expect($('[data-form-group-id="cb2:1"]').matches('.st-form-groups__group--visible')).toEqual(false);

    $('input[type=checkbox][name=cb2]').click();
    expect($('[data-form-group-id="cb1:1"]').matches('.st-form-groups__group--visible')).toEqual(true);
    expect($('[data-form-group-id="cb2:1"]').matches('.st-form-groups__group--visible')).toEqual(true);
  });
});
