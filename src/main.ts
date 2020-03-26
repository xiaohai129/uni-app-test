import Vue from 'vue';
import App from './App.vue';
import Navbar from '@/components/navbar';

Vue.config.productionTip = false;
Vue.component('Navbar', Navbar);

new App().$mount();
