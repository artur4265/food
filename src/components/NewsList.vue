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
            <span icon="shopping_cart" slot="subtitle"> <q-icon name="alarm" /> Время приготовления - {{ detaliTimeCook }}</span>
          </q-card-title>
          <q-card-separator />

      <q-list>
        <q-collapsible group="somegroup" icon="receipt" label="Рецепт" opened>
          <div>
            <q-card-main v-html="detaliText"></q-card-main>
          </div>
        </q-collapsible>
        <q-collapsible group="somegroup" icon="view_list" label="Состав">
          <div>
            <q-card-main class="quote" v-html="detaliSostav"></q-card-main>
          </div>
        </q-collapsible>
        <q-collapsible group="somegroup" icon="donut_large" label="Энергетическая ценность">
          <div>
            <p class="quote">На 100гр блюда:</p>
            <p>Калории - <span class="token">{{ detaliKall }} kkal</span></p>
            <p>Белки - <span class="token">{{ detaliBelki }}</span></p>
            <p>Жиры - <span class="token">{{ detaliJiri }}</span></p>
            <p>Углеводы - <span class="token">{{ detaliUglevodi }}</span></p>
          </div>
        </q-collapsible>
      </q-list>

          <q-card-actions>
            <q-btn color="red" @click="$refs.maximizedModal.close()">Назад</q-btn>
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
      detaliId: null,
      detaliTitle: null,
      detaliText: null,
      detaliSostav: null,
      detaliImg: null,
      detaliRecipe: null,
      detaliTimeCook: null,
      detaliKall: null,
      detaliBelki: null,
      detaliJiri: null,
      detaliUglevodi: null

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
      this.detaliTimeCook = this.detaliRecipe[0].metadata.time_to_cook[0]
      this.detaliKall = this.detaliRecipe[0].metadata.kkal[0]
      this.detaliBelki = this.detaliRecipe[0].metadata.belki[0]
      this.detaliJiri = this.detaliRecipe[0].metadata.jiri[0]
      this.detaliUglevodi = this.detaliRecipe[0].metadata.uglevodi[0]
    }

  }

}
</script>

<style>
</style>
