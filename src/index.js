import { Controller } from '@hotwired/stimulus';
import './index.scss'

export default class extends Controller {
  static values = {
    mode: String
  };

  get groups() {
    return this.scope.findAllElements('[data-form-group-id]');
  }

  toggle(e) {
    if (this.modeValue == 'disabled') {
      this.groups.forEach(group => this.toggleDisabled(group, true));
      this.findGroups(e.target).forEach(group => this.toggleDisabled(group, false));
    } else {
      this.groups.forEach(group => this.toggleVisible(group, false));
      this.findGroups(e.target).forEach(group => this.toggleVisible(group, true));
    }
  }

  toggleVisible(group, flag) {
    group.style.display = flag ? '' : 'none';
    group.classList.toggle('st-form-groups__group--visible', flag);
  }

  toggleDisabled(group, flag) {
    group.querySelectorAll('input, select, textarea, button').forEach(elem => elem.disabled = flag);
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
    } else if (target.matches('input[type=radio]')) {
      return target.value;
    } else if (target.matches('input[type=checkbox]')) {
      return target.checked;
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
