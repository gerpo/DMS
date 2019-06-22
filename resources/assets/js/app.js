/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex';
// Vue Extensions
import VueMoment from 'vue-moment';
import PortalVue from 'portal-vue';
import VeeValidate from 'vee-validate';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';
import route from "../../../vendor/tightenco/ziggy/src/js/route";
// Vue components
import VueFlashMessage from 'vue-flash-message';
import moment from 'moment';
import VueFilter from './plugins/VueFilter';

const lang = document.documentElement.lang.substr(0, 2);
// TODO: change to detect browser language
//const lang = navigator.language.substr(0, 2);

moment.locale(lang);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const files = require.context('./', true, /\.vue$/i, 'lazy');
files.keys().forEach(file =>
    Vue.component(file.split('/').pop().split('.')[0],
        () => import(
            /*webpackChunkName: "[request]" */
            `${file}`
            )
    )
);

// Alert components for vue
Vue.use(VueFlashMessage, {
    template: '@/templates/AlertTemplate.html',
    messageOptions: {
        timeout: 4000,
        pauseOnInteract: true,
    }
});

// moment.js for vue
Vue.use(VueMoment, {
    moment
});

// Translation helper for vue
Vue.use(VueInternationalization);

Vue.use(VeeValidate, {errorBagName: 'validationErrors'});

const i18n = new VueInternationalization({
    locale: lang,
    fallbackLocale: 'en',
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
        },
        $is: (role, user_id = 0) => {
            return window.laravel.roles.includes('admin') ||
                window.laravel.roles.includes(role) ||
                window.laravel.user_id === user_id
        },
        $isAuthedUser: (user_id) => {
            return window.laravel.user_id === user_id;
        }
    }
});

Vue.mixin({
    methods: {
        $tv: function (key, ...values) {
            const newKey = `vendor.${key.replace('::', '.')}`;
            return this.$t(newKey, ...values)
        }
    }
});

Vue.use(VueFilter);
Vue.use(PortalVue);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        locale: lang,
    },
});

const app = new Vue({
    el: '#app',
    store,
    i18n
});
