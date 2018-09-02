// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import shuffle from 'lodash.shuffle';
import VueSwing from 'vue-swing';
import App from './App';

// import amazon from './services/amazon';
// import email from './services/email';
// import github from './services/github';
// import home from './services/home';
import instagram from './services/instagram';
// import netflix from './services/netflix';
// import twitter from './services/twitter';
// import unsplash from './services/unsplash';

Vue.component('vue-swing', VueSwing);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App :elements="elements" />',
  data: {
    elements: [],
  },
  methods: {},
  created() {
    // Add elements from services
    this.elements = this.elements.concat(
      // amazon.elements,
      // email.elements,
      // github.elements,
      // home.elements,
      instagram.elements,
      // netflix.elements,
      // twitter.elements,
      // unsplash.elements,
    );

    // Randomize elements on startup
    this.elements = shuffle(this.elements);
    // this.elements = this.elements.sort(function() {
    //   return 0.5 - Math.random();
    // });
  },
});
