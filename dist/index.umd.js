!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@hotwired/stimulus")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus"],t):(e||self).StimulusFormGroup=t(e.Stimulus)}(this,function(e){class t extends e.Controller{get groups(){return this.scope.findAllElements("[data-form-group-id]")}get togglers(){return this.context.bindingObserver.bindings.filter(e=>"toggle"==e.action.methodName).map(e=>e.action.element)}connect(){this.enableTrans(!1),this.toggleGroups(),setTimeout(()=>this.enableTrans(!0),200)}enableTrans(e){e?this.element.classList.remove("st-form-groups--disable-trans"):this.element.classList.add("st-form-groups--disable-trans")}toggle(e){this.toggleGroups()}toggleGroups(){var e=this.togglers.flatMap(e=>this.findGroups(e));this.groups.forEach(t=>this.toggleGroup(t,e.includes(t)))}toggleGroup(e,t){return"disabled"==this.modeValue?this.toggleDisabled(e,t):this.toggleVisible(e,t)}toggleVisible(e,t){t?(e.style.height=e.scrollHeight+"px",e.classList.add("st-form-groups__group--visible")):(e.style.height="0px",e.classList.remove("st-form-groups__group--visible"))}toggleDisabled(e,t){this.inputElements(e).forEach(e=>e.disabled=!t)}inputElements(e){return e.querySelectorAll("input, select, textarea, button")}findGroups(e){var t=this.getValue(e);return t?this.groups.filter(s=>this.isMatch(s,e.name,t)):[]}getValue(e){if(e.matches("select"))return e.options[e.selectedIndex].value;if(e.matches("input[type=checkbox]"))return e.checked?e.value:null;if(e.matches("input[type=radio]")){var t=this.scope.findElement('input[type=radio][name="'+e.name+'"]:checked');return t?t.value:null}}isMatch(e,t,r){return new s(e.getAttribute("data-form-group-id")).nameValues.some(e=>{var[s,i]=e;return(!s||s==t)&&i==r})}}t.values={mode:String};class s{constructor(e){this.idset=e,this.ids=this.parse(e)}get nameValues(){return this.ids.map(e=>this.parseID(e))}parse(e){return e.startsWith("[")?[].concat(this.parseJSON(e)):[].concat(e)}parseID(e){return e.includes(":")?e.split(":",2):[null,e]}parseJSON(e){try{return JSON.parse(e)}catch(t){return e}}}return t});
//# sourceMappingURL=index.umd.js.map
