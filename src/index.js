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
    this.toggleGroups(false);
  }

  toggle(e) {
    this.toggleGroups()
  }

  toggleGroups(transition = true) {
    let onGroups = this.togglers.flatMap(toggler => this.findGroups(toggler));
    this.groups.forEach(group => {
      if (onGroups.includes(group)) {
        this.on(group, transition);
      } else {
        this.off(group, transition);
      }
    });
  }

  on(group, transition = true) {
    if (this.modeValue == 'disabled') {
      this.enable(group);
    } else {
      this.show(group, transition);
    }
  }

  off(group, transition = true) {
    if (this.modeValue == 'disabled') {
      this.disable(group);
    } else {
      this.hide(group, transition);
    }
  }

  show(group, transition = true) {
    if (group.classList.contains('st-form-groups__group--visible')) return;

    if (transition) {
      group.style.height = '0px';
      group.removeEventListener('transitionend', this.transitionEnd);
      group.addEventListener('transitionend', this.transitionEnd);
      setTimeout(() => {
        group.style.height = group.scrollHeight + 'px';
      });
    }

    group.classList.add('st-form-groups__group--visible');
  }

  hide(group, transition = true) {
    if (!group.classList.contains('st-form-groups__group--visible')) return;

    if (transition) {
      group.style.height = group.scrollHeight + 'px';
      group.removeEventListener('transitionend', this.transitionEnd);
      group.addEventListener('transitionend', this.transitionEnd);
      setTimeout(() => {
        group.style.height = '0px';
      });
    }

    group.classList.remove('st-form-groups__group--visible');
  }

  transitionEnd(e) {
    e.target.style.height = '';
  }

  enable(group) {
    this.toggleDisabled(group, true);
  }

  disable(group) {
    this.toggleDisabled(group, false);
  }

  toggleDisabled(group, enabled) {
    this.inputElements(group).forEach(elem => elem.disabled = !enabled);
  }

  inputElements(group) {
    return group.querySelectorAll('input, select, textarea, button')
  }

  findGroups(toggler) {
    let value = this.getValue(toggler);
    if (!value) {
      return [];
    } else {
      return this.groups.filter(group => this.isMatch(group, toggler.name, value));
    }
  }

  getValue(toggler) {
    if (toggler.matches('select')) {
      return toggler.options[toggler.selectedIndex].value;
    } else if (toggler.matches('input[type=checkbox]')) {
      return toggler.checked ? toggler.value : null;
    } else if (toggler.matches('input[type=radio]')) {
      let checked = this.scope.findElement(`input[type=radio][name="${toggler.name}"]:checked`);
      return checked ? checked.value : null;
    }
  }

  isMatch(group, togglerName, togglerValue) {
    let set = new GroupIDSet(group.getAttribute('data-form-group-id'));
    return set.nameValues.some(([name, value]) => {
      return (!name || name == togglerName) && value == togglerValue
    });
  }
}

class GroupIDSet {
  constructor(idset) {
    this.idset = idset;
    this.ids = this.parse(idset);
  }

  get nameValues() {
    return this.ids.map(id => this.parseID(id));
  }

  parse(idset) {
    if (idset.startsWith('[')) {
      return [].concat(this.parseJSON(idset));
    } else {
      return [].concat(idset);
    }
  }

  parseID(id) {
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
