/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
const showdown = require('showdown');

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
import Notification from 'vue-notification'
import moment from 'moment';
import VueFilter from './plugins/VueFilter';

const lang = document.documentElement.lang.substr(0, 2);
// TODO: change to detect browser language
//const lang = navigator.language.substr(0, 2);
if (lang !== 'en') {
    require(`moment/locale/${lang}`);
}
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


Vue.use(Notification);

// moment.js for vue
Vue.use(VueMoment, {
    moment,
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
            return window.dms.roles.hasOwnProperty('admin') ||
                window.dms.permissions.includes(permission) ||
                window.dms.user_id === user_id;
        },
        $is: (role, user_id = 0) => {
            return window.dms.roles.hasOwnProperty('admin') ||
                window.dms.roles.hasOwnProperty(role) ||
                window.dms.user_id === user_id
        },
        $isAuthedUser: (user_id) => {
            return window.dms.user_id === user_id;
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
Vue.mixin({
    methods: {
        $markdown(value) {
            const converter = new showdown.Converter();
            return converter.makeHtml(value);
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
