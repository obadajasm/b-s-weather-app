import Vue from "vue";
import Vuex from "vuex";

import Weather from "@/store/weather";
Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    Weather,
  },
});

export default store;
