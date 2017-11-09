import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    requests: 'http://mob.4bstudio.com.ua/wp-json/wp/v2/posts/',
    recipes: []
  },

  mutations: {

    setRecipeslist (state, recipes) {
      state.recipes = recipes
    }

  }

})
