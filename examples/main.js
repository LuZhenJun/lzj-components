import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '../packages/index';
import './assets/config.scss';

Vue.config.productionTip = false;
components.install(Vue, {});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
