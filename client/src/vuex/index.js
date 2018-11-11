/**
 * Created by wbt on 2018/2/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import app from './app/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
  }
});

export default store;

