/**
 * Route file
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import tokenConfig from './utils/tokenConfig.js';

Vue.use(VueRouter);


// check if is not authenticated
const isNotAuthenticated = (to, from, next) => {
    if (!tokenConfig.getToken()) {
        return next('/connexion')
    }
    next()
}

// check if user is connected
const isAuthenticated = (to, from, next) => {
    if (tokenConfig.getToken() != null) {
        return location.href = '/';
    }
    next()
}


// mode history => hide #/ in the URL
const Routes = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Home,
            beforeEnter: isNotAuthenticated
        },
        {
            path: '/connexion',
            name: 'connexion',
            component: Login,
            beforeEnter: isAuthenticated
        },
    ]
});

export default Routes;