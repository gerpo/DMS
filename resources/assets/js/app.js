/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
// Vue Extensions
import VueMoment from 'vue-moment';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';
import route from "../../../vendor/tightenco/ziggy/src/js/route";
// Vue components
import VueFlashMessage from 'vue-flash-message';
import {TableColumn, TableComponent} from 'vue-table-component';

const lang = document.documentElement.lang.substr(0, 2);
//const lang = navigator.language;
const moment = require('moment');
moment.locale(lang);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('user-component', require('./components/UserComponent.vue'));
Vue.component('profile-component', require('./components/ProfileComponent.vue'));
Vue.component('edit-user-component', require('./components/EditUserComponent.vue'));
Vue.component('roles-component', require('./components/RolesComponent.vue'));
Vue.component('role-abilities-component', require('./components/RoleAbilitiesComponent.vue'));
Vue.component('user-roles-component', require('./components/UserRolesComponent.vue'));
Vue.component('plugins-component', require('./components/PluginsComponent.vue'));

Vue.component('modal', require('./components/ModalComponent.vue'));
Vue.component('autocomplete', require('./components/AutoCompleteComponent.vue'));
Vue.component('table-component', TableComponent);
Vue.component('table-column', TableColumn);

// Alert components for vue
Vue.use(VueFlashMessage, {
    template: require('./templates/AlertTemplate.html'),
    messageOptions: {
        timeout: 4000,
        pauseOnInteract: true
    }
});

// moment.js for vue
Vue.use(VueMoment, {
    moment
});

// Translation helper for vue
Vue.use(VueInternationalization);

const i18n = new VueInternationalization({
    locale: lang,
    messages: Locale
});

// Laravel routes helper for vue
Vue.mixin({
    methods: {
        route
    }
});

// Laravel permissions and role mixins
Vue.mixin({
    methods: {
        $can: (permission, user_id = 0) => {
            return window.laravel.roles.includes('admin') ||
                window.laravel.permissions.includes(permission) ||
                window.laravel.user_id === user_id;
        }
    }
});

Vue.mixin({
    methods: {
        $is: (role, user_id = 0) => {
            return window.laravel.roles.includes('admin') ||
                window.laravel.roles.includes(role) ||
                window.laravel.user_id === user_id
        }
    }
});

const app = new Vue({
    el: '#app',
    i18n
});