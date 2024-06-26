import { Application } from '@hotwired/stimulus';
import FormGroupsController from 'index';

const application = Application.start();
application.register('form-groups', FormGroupsController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);
