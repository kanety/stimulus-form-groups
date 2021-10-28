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
    this.groups.forEach(group => this.toggleGroup(group, false));
    this.togglers.forEach(toggler => this.toggleBy(toggler));
    setTimeout(() => this.enableAnim(true), 200);
  }

  enableAnim(enabled) {
    this.groups.forEach(group => {
      if (enabled) {
        group.classList.remove('st-form-groups--disable-trans')
      } else {
        group.classList.add('st-form-groups--disable-trans')
      }
    });
  }

  toggle(e) {
    this.groups.forEach(group => this.toggleGroup(group, false));
    this.togglers.forEach(toggler => this.toggleBy(toggler));
  }

  toggleBy(elem) {
    this.findGroups(elem).forEach(group => this.toggleGroup(group, true));
  }

  toggleGroup(group, flag) {
    if (this.modeValue == 'disabled') {
      return this.toggleDisabled(group, flag);
    } else {
      return this.toggleVisible(group, flag);
    }
  }

  toggleVisible(group, visible) {
    if (visible) {
      group.style.visibility = '';
      group.style.overflow = '';
      group.style.height = group.scrollHeight + 'px';
      group.classList.add('st-form-groups__group--visible');
    } else {
      group.style.visibility = 'hidden';
      group.style.overflow = 'hidden';
      group.style.height = '0px';
      group.classList.remove('st-form-groups__group--visible');
    }
  }

  toggleDisabled(group, enabled) {
    this.inputElements(group).forEach(elem => elem.disabled = !enabled);
  }

  inputElements(group) {
    return group.querySelectorAll('input, select, textarea, button')
  }

  findGroups(target) {
    let value = this.getValue(target);
    if (!value) {
      return [];
    } else {
      return this.groups.filter(group => this.isMatch(group, target.name, value));
    }
  }

  isMatch(group, targetName, targetValue) {
    return this.extractIDs(group.getAttribute('data-form-group-id')).some(id => {
      let [name, value] = this.extractNameValue(id);
      return (!name || name == targetName) && value == targetValue
    });
  }

  getValue(target) {
    if (target.matches('select')) {
      return target.options[target.selectedIndex].value;
    } else if (target.matches('input[type=checkbox]')) {
      return target.checked ? target.value : null;
    } else if (target.matches('input[type=radio]')) {
      let checked = this.scope.findElement(`input[type=radio][name="${target.name}"]:checked`);
      return checked ? checked.value : null;
    }
  }

  extractIDs(str) {
    if (str.startsWith('[')) {
      return [].concat(this.parseJSON(str));
    } else {
      return [].concat(str);
    }
  }

  extractNameValue(id) {
    if (id.includes(':')) {
      return id.split(':', 2)
    } else {
      return [null, id];
    }
  }

  parseJSON(str) {
    try {
      return JSON.parse(str);
    } catch(error) {
      return str;
    }
  }
}
