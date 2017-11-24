import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    requests: '',
    recipes: [],
    categories: []
  },

  mutations: {

    setRecipeslist (state, recipes) {
      state.recipes = recipes
    },

    setCategorieslist (state, categories) {
      state.categories = categories
    },

    setRequest (state, requests) {
      state.requests = requests
    }

  },

  getters: {
    // ...
    getRecipeById: (state, getters) => (id) => {
      return state.recipes.find(recipe => recipe.id === id)
    }

    // getCategiriesById: (state, getters) => (id) => {
    //   return state.categories.find(categories => categories.id === id)
    // }

  }

})
