import{Controller as t}from"@hotwired/stimulus";class e extends t{get groups(){return this.scope.findAllElements("[data-form-group-id]")}toggle(t){var e;e="disabled"==this.modeValue?this.toggleDisabled.bind(this):this.toggleVisible.bind(this),this.groups.forEach(t=>e(t,!1)),this.findGroups(t.target).forEach(t=>e(t,!0))}toggleVisible(t,e){t.style.display=e?"":"none",t.classList.toggle("st-form-groups--visible",e)}toggleDisabled(t,e){this.inputElements(t).forEach(t=>t.disabled=!e)}inputElements(t){return t.querySelectorAll("input, select, textarea, button")}findGroups(t){var e=this.getGroupID(t);return e?this.groups.filter(t=>this.parseJSON(t.getAttribute("data-form-group-id")).includes(e)):[]}getGroupID(t){return t.matches("select")?t.options[t.selectedIndex].value:t.matches("input[type=radio]")?t.value:t.matches("input[type=checkbox]")?t.checked:void 0}parseJSON(t){try{return[].concat(JSON.parse(t))}catch(e){return[].concat(t)}}}e.values={mode:String};export{e as default};
//# sourceMappingURL=index.module.js.map
