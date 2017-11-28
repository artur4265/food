<template>
  <div id="news-list">

  <div class="layout-padding card-examples row items-start">

      <q-card inline v-for="recipe in recipes"  v-bind:key="recipe.id">
        <q-card-media v-if="recipe.acf.link_to_another_source !== false">
          <img v-bind:src="recipe.acf.link_to_another_source">
        </q-card-media>
        <q-card-media v-else>
          <img src="../assets/nia.jpg">
        </q-card-media>
        <q-card-title>
          {{ recipe.title.rendered }}
          <!--<span slot="subtitle">Subtitle</span>-->
        </q-card-title>
        <!--<q-card-main v-html="recipe.content.rendered"></q-card-main>-->
        <q-card-actions>
          <q-btn flat @click="$refs.maximizedModal.open(); getDetaliRecipe(recipe.id);">Read more</q-btn>
        </q-card-actions>
      </q-card>


  <p>{{ notFoundRecipes }}</p>


      <q-modal ref="maximizedModal" maximized :content-css="{padding: '5px'}">
        <q-card>
          <q-card-media v-if="detaliImg !== false">
            <img v-bind:src="detaliImg">
          </q-card-media>
          <q-card-media v-else>
            <img src="../assets/nia.jpg">
          </q-card-media>
          <q-card-title>
            {{ detaliTitle }}
            <span slot="subtitle">Subtitle</span>
          </q-card-title>
          <q-card-main v-html="detaliText"></q-card-main>
          <q-card-separator />
          <div class="quote">Состав:</div>
          <q-card-main v-html="detaliSostav"></q-card-main>
          <q-card-actions>
            <q-btn color="red" @click="$refs.maximizedModal.close()">Close Me</q-btn>
          </q-card-actions>
        </q-card>
      </q-modal>

  </div>

  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QList,
  QItem,
  QItemMain,
  QItemSide,
  QItemTile,
  QCollapsible,
  QRating,
  QBtn,
  QParallax,
  QIcon,
  QPopover,
  QVideo,
  QModal,
  QModalLayout
} from 'quasar'

export default {

  components: {
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QCollapsible,
    QRating,
    QBtn,
    QParallax,
    QIcon,
    QPopover,
    QVideo,
    QModal,
    QModalLayout
  },

  data () {
    return {

      modalLabel: 'Always Maximized',
      modalRef: 'maximizedModal',
      detalRecipe: [],
      notFoundRecipes: '111',
      detaliId: null,
      detaliTitle: null,
      detaliText: null,
      detaliSostav: null,
      detaliImg: null,
      detaliRecipe: null

    }
  },

  computed: {
    recipes () {
      return this.$store.state.recipes
    },

    requests () {
      return this.$store.state.requests
    }

    // getDetaliRecipe: function (id) {
    //   console.log(this.$store.getters.getRecipeById(0))
    // }

  },

  created: function () {
    this.getRecipeslist()
  },

  methods: {

    getRecipeslist () {
      this.$store.watch((state) => state.requests, () => {
        // console.log(this.$store.state.requests + 'new')
        if (this.$store.state.requests !== '') {
          this.notFoundRecipes = ''
          this.$http.get(this.$store.state.requests).then(response => {
            this.$store.commit('setRecipeslist', response.data)
            return this.$store.state.recipes
          })
        } else {
          this.notFoundRecipes = 'По Вашему запросу ничего не найдено.'
        }
      })
    },

    getDetaliRecipe: function (id) {
      console.log(id)
      var filterRecipe = this.$store.state.recipes

      function checkId (recipe) {
        return recipe.id === id
      }

      this.detaliRecipe = Object.values(filterRecipe.filter(checkId))
      this.detaliTitle = this.detaliRecipe[0].title.rendered
      this.detaliText = this.detaliRecipe[0].content.rendered
      this.detaliSostav = this.detaliRecipe[0].metadata.sostav[0]
      this.detaliImg = this.detaliRecipe[0].metadata.link_to_another_source[0]
    }

  }

}
</script>

<style>
</style>
