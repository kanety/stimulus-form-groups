var e=require("@hotwired/stimulus");class t extends e.Controller{get groups(){return this.scope.findAllElements("[data-form-group-id]")}get togglers(){return this.context.bindingObserver.bindings.filter(e=>"toggle"==e.action.methodName).map(e=>e.action.element)}connect(){this.enableAnim(!1),this.groups.forEach(e=>this.toggleGroup(e,!1)),this.togglers.forEach(e=>this.toggleBy(e)),setTimeout(()=>this.enableAnim(!0),200)}enableAnim(e){this.groups.forEach(t=>{e?t.classList.remove("st-form-groups--disable-trans"):t.classList.add("st-form-groups--disable-trans")})}toggle(e){this.groups.forEach(e=>this.toggleGroup(e,!1)),this.togglers.forEach(e=>this.toggleBy(e))}toggleBy(e){this.findGroups(e).forEach(e=>this.toggleGroup(e,!0))}toggleGroup(e,t){return"disabled"==this.modeValue?this.toggleDisabled(e,t):this.toggleVisible(e,t)}toggleVisible(e,t){t?(e.style.visibility="",e.style.overflow="",e.style.height=e.scrollHeight+"px",e.classList.add("st-form-groups__group--visible")):(e.style.visibility="hidden",e.style.overflow="hidden",e.style.height="0px",e.classList.remove("st-form-groups__group--visible"))}toggleDisabled(e,t){this.inputElements(e).forEach(e=>e.disabled=!t)}inputElements(e){return e.querySelectorAll("input, select, textarea, button")}findGroups(e){var t=this.getValue(e);return t?this.groups.filter(s=>this.isMatch(s,e.name,t)):[]}isMatch(e,t,s){return this.extractIDs(e.getAttribute("data-form-group-id")).some(e=>{var[r,i]=this.extractNameValue(e);return(!r||r==t)&&i==s})}getValue(e){if(e.matches("select"))return e.options[e.selectedIndex].value;if(e.matches("input[type=checkbox]"))return e.checked?e.value:null;if(e.matches("input[type=radio]")){var t=this.scope.findElement('input[type=radio][name="'+e.name+'"]:checked');return t?t.value:null}}extractIDs(e){return e.startsWith("[")?[].concat(this.parseJSON(e)):[].concat(e)}extractNameValue(e){return e.includes(":")?e.split(":",2):[null,e]}parseJSON(e){try{return JSON.parse(e)}catch(t){return e}}}t.values={mode:String},module.exports=t;
//# sourceMappingURL=index.js.map
