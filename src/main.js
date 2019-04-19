// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Main from './Main';

Vue.config.productionTip = false;

/* eslint-disable no-new */

const View = Vue.extend(Main);
new View().$mount('#app-content');
