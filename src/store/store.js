import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    news: [
      {id: 1, detali: '111111'},
      {id: 2, detali: '222222'},
      {id: 3, detali: '333333'},
      {id: 4, detali: '444444'},
      {id: 5, detali: '555555'},
      {id: 6, detali: '666666'},
      {id: 6, detali: '777777'}
    ],
    requests: [],
    testlist: []
  },

  mutations: {

    setTestlist (state, testlist) {
      state.testlist = testlist
    }

  }

})
