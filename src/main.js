// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Main from './Main';

// Special case for Nextcloud CSP
// See https://blog.wuc.me/2018/10/18/nextcloud-vue-csp.html
// And https://icewind.nl/entry/nextcloud-webpack/
if (typeof OC !== 'undefined') {
  // eslint-disable-next-line
  __webpack_nonce__ = btoa(OC.requestToken);
  // eslint-disable-next-line
  __webpack_require__.p = OC.filePath('keeporsweep', 'js', '../js/');
  const script = document.querySelector('[nonce]');
  // eslint-disable-next-line
  __webpack_require__.nc = script.nonce || script.getAttribute('nonce');
}

Vue.config.productionTip = false;

/* eslint-disable no-new */

const View = Vue.extend(Main);
new View().$mount('#app-content');
