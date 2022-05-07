describe('selected', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="form-groups">
        <select data-action="form-groups#toggle">
          <option value=""></option>
          <option value="group1" selected>group1</option>
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
    expect($('[data-form-group-id="group1"]').matches('.st-form-groups__group--visible')).toEqual(true);
    expect($('[data-form-group-id="group2"]').matches('.st-form-groups__group--visible')).toEqual(false);
  });
});
