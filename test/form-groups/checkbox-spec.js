describe('checkbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <label><input type="checkbox" value="true" data-action="form-groups#toggle">group1</label>
        <div data-form-group-id="true">
          <p>group1 content</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').matches('.st-form-groups__group--visible')).toEqual(true);

    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').matches('.st-form-groups__group--visible')).toEqual(false);
  });
});
