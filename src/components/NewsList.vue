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
          <span slot="subtitle">Subtitle</span>
        </q-card-title>
        <q-card-main v-html="recipe.content.rendered"></q-card-main>
        <q-card-actions>
          <q-btn flat v-ripple.mat @click="$refs.maximizedModal.open(); getDetaliRecipe(recipe.id);">Read more</q-btn>
        </q-card-actions>
      </q-card>


      <q-modal ref="maximizedModal" maximized :content-css="{padding: '50px'}">
        <h4>Minimized Modal</h4>
        <p>This one has backdrop on small screens too.</p>
        <q-btn color="red" @click="$refs.maximizedModal.close()">Close Me</q-btn>
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
  QModalLayout,
  Ripple
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

  directives: {
    Ripple
  },

  data () {
    return {

      modalLabel: 'Always Maximized',
      modalRef: 'maximizedModal'

    }
  },

  computed: {
    recipes () {
      return this.$store.state.recipes
    },

    requests () {
      return this.$store.state.requests
    }

  },

  created: function () {
    this.getRecipeslist()
  },

  methods: {
    getRecipeslist () {
      this.$http.get(this.$store.state.requests).then(response => {
        this.$store.commit('setRecipeslist', response.data)
        return this.$store.state.recipes
      })
    },

    getDetaliRecipe: function (id) {
      console.log(id)
    }

  }
}
</script>

<style>
</style>
