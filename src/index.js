import { Controller } from '@hotwired/stimulus';
import './index.scss';

export default class extends Controller {
  static values = {
    mode: String
  };

  get groups() {
    return this.scope.findAllElements('[data-form-group-id]');
  }

  get togglers() {
    return this.context.bindingObserver.bindings
               .filter(binding => binding.action.methodName == 'toggle')
               .map(binding => binding.action.element);
  }

  connect() {
    this.enableAnim(false);
    this.togglers.forEach(toggler => this.toggleBy(toggler));
    setTimeout(() => this.enableAnim(true), 200);
  }

  enableAnim(enabled) {
    this.groups.forEach(group => {
      if (enabled) {
        group.classList.remove('st-form-groups--disable-anim')
      } else {
        group.classList.add('st-form-groups--disable-anim')
      }
    });
  }

  toggle(e) {
    this.toggleBy(e.target);
  }

  toggleBy(elem) {
    let method = this.toggleMethod();
    this.groups.forEach(group => method(group, false));
    this.findGroups(elem).forEach(group => method(group, true));
  }

  toggleMethod() {
    if (this.modeValue == 'disabled') {
      return this.toggleDisabled.bind(this);
    } else {
      return this.toggleVisible.bind(this);
    }
  }

  toggleVisible(group, visible) {
    if (visible) {
      group.style.display = '';
      group.classList.add('st-form-groups--fade-in');
    } else {
      group.style.display = 'none';
      group.classList.remove('st-form-groups--fade-in');
    }
  }

  toggleDisabled(group, enabled) {
    this.inputElements(group).forEach(elem => elem.disabled = !enabled);
  }

  inputElements(group) {
    return group.querySelectorAll('input, select, textarea, button')
  }

  findGroups(target) {
    let id = this.getGroupID(target);
    if (!id) {
      return [];
    } else {
      return this.groups.filter(group => this.parseJSON(group.getAttribute('data-form-group-id')).includes(id));
    }
  }

  getGroupID(target) {
    if (target.matches('select')) {
      return target.options[target.selectedIndex].value;
    } else if (target.matches('input[type=checkbox]')) {
      return target.checked;
    } else if (target.matches('input[type=radio]')) {
      let checked = this.scope.findElement(`input[type=radio][name="${target.name}"]:checked`);
      return checked ? checked.value : null;
    }
  }

  parseJSON(ids) {
    try {
      return [].concat(JSON.parse(ids));
    } catch(e) {
      return [].concat(ids);
    }
  }
}
