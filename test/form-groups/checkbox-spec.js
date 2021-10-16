describe('checkbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <label><input type="checkbox" data-action="form-groups#toggle">group1</label>
        <div data-form-group-id="true">
          <p>group1 content</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').style.display).toEqual('');

    $('input[type=checkbox]').click();
    expect($('[data-form-group-id="true"]').style.display).toEqual('none');
  });
});
