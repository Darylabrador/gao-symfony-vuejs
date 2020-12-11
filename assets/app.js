/**
 * Main file with all routes and components
 */
import Vue from 'vue';
import Vuetify from 'vuetify';
import Routes from './routes';
import Layout from './layouts/Layout.vue';
import 'vuetify/dist/vuetify.min.css';
import FlashMessage from '@smartweb/vue-flash-message';
import _ from 'lodash';

// Vue using Vuetify
Vue.use(Vuetify);
Vue.use(FlashMessage);

// Main component that use Layout and it's component from app.blade.php
const main = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    router: Routes,
    components: { Layout }
})

export default new Vuetify(main);