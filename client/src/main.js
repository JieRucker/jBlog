// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import {router} from '@/router/index';
import store from '@/vuex/index';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import wyboot from '@/libs/wyboot';
import api from '@/api/server';
import JsEncrypt from 'jsencrypt';
import jDynamic from '@/components/j-dynamic/index';

Vue.use(VueI18n);
Vue.use(iView);

Vue.prototype.$api = api;
Vue.prototype.$Global = wyboot;
Vue.prototype.$jsEncrypt = JsEncrypt;
Vue.prototype.$jDynamic = jDynamic;

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});

Vue.directive('scrollShow', {
  bind: el => {
    window.addEventListener('scroll', () => {
      let actualTop = el.offsetTop,
        current = el.offsetParent;
      while (current != null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      if (actualTop - document.body.scrollTop < 300) {
        el.classList.add("show");
      }
    });
  }
});

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});
