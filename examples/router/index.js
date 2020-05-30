import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/style',
        name: 'style',
        component: () => import(/* webpackChunkName: "about" */ '../views/styleTest')
    },
    {
        path: '/components',
        name: 'components',
        component: () => import(/* webpackChunkName: "about" */ '../views/componentsTest')
    },
    {
        path: '/functions',
        name: 'functions',
        component: () => import(/* webpackChunkName: "about" */ '../views/functionsTest')
    },
    {
        path: '/directive',
        name: 'directive',
        component: () => import(/* webpackChunkName: "about" */ '../views/directiveTest')
    },
    {
        path: '/filters',
        name: 'filters',
        component: () => import(/* webpackChunkName: "about" */ '../views/filtersTest')
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
