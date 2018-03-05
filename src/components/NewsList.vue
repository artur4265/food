<template>
  <div id="news-list">

    <div class="layout-padding card-examples row items-start">



<!-- Card preivie -->

      <q-card inline v-for="recipe in recipes" v-bind:key="recipe.id">
        <q-card-media v-if="recipe.acf.link_to_another_source !== false">
          <!-- <img v-bind:src="recipe.acf.link_to_another_source"> -->
          <progressive-img v-bind:src="recipe.acf.link_to_another_source" :blur="30"
            v-bind:placeholder="recipe.acf.link_to_another_source"
            fallback="https://pp.userapi.com/c622226/v622226441/386c7/AH2NtK8sPN4.jpg"
            no-ratio/>
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
          <q-btn outline color="primary" @click="$refs.maximizedModal.open(); getDetaliRecipe(recipe.id);">смотреть</q-btn>
        </q-card-actions>
      </q-card>



<!-- Detali card -->

      <q-modal class="popup_detali" ref="maximizedModal" maximized>
        <q-card class="popup_detali__card">
          <q-card-actions class="detali_actions--mod-absolute">
            <div class="col-6">
              <q-btn color="" class="bt-30px" @click="$refs.maximizedModal.close()" small>
                <q-icon name="keyboard_backspace" /></q-btn>
            </div>
            <div class="col-6">
              <q-btn class="fl_right bt-30px" slot="right" icon="more_vert" name="more_vert" small>
                <q-popover ref="popover">
                  <q-list link class="no-border">
                    <q-item @click="$refs.popover.close(); savedRecipe(); toastWithType('positive', 'избранное');">
                      <q-item-main label="Добавить в избранное" />
                    </q-item>
                    <q-item @click="$refs.popover.close(); addList(); toastWithType('positive', 'список покупок');">
                      <q-item-main label="Сохранить в список покупок" />
                    </q-item>
                    <q-item @click="$refs.minimizedModal.open(); $refs.popover.close();">
                      <q-item-main label="Поделиться в соц. сетях" />
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </q-card-actions>

          <q-card-media v-if="detaliImg !== false">
            <!-- <img class="detali_img" v-bind:src="detaliImg"> -->
            <progressive-img v-bind:src="detaliImg" :blur="0"
              v-bind:placeholder="detaliImg"
              fallback="https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/p160x160/17342777_400396710325485_6251911563858201114_n.jpg?oh=66a03da29aedc57a0f8d61e44d513d7b&oe=5B47D02B"
              no-ratio/>
          </q-card-media>
          <q-card-media v-else>
            <img src="/../assets/nia.jpg">
          </q-card-media>

          <q-card-title>
            {{ detaliTitle }}
            <span icon="shopping_cart" slot="subtitle">
              <q-icon name="ion-clock" /> - {{ detaliTimeCook }}
              <q-icon name="ion-person-stalker" /> - {{ detaliCountPersons }}
              </span>
          </q-card-title>

          <q-card-separator />

          <q-list>
            <q-collapsible group="somegroup" icon="receipt" label="Рецепт" opened>
              <div class="--reletive_text_step">
                <q-card-main v-html="detaliText"></q-card-main>
              </div>
            </q-collapsible>
            <q-collapsible group="somegroup" icon="view_list" label="Состав">
              <div>
                <q-card-main class="quote" v-html="detaliSostav"></q-card-main>
              </div>
            </q-collapsible>
            <q-collapsible group="somegroup" icon="ion-fireball" label="Энергетическая ценность">
              <div>
                <p class="quote">На 100гр блюда:</p>
                <p>Калории -
                  <span class="token">{{ detaliKall }} kkal</span>
                </p>
                <p>Белки -
                  <span class="token">{{ detaliBelki }}</span>
                </p>
                <p>Жиры -
                  <span class="token">{{ detaliJiri }}</span>
                </p>
                <p>Углеводы -
                  <span class="token">{{ detaliUglevodi }}</span>
                </p>
              </div>
            </q-collapsible>
          </q-list>

          <q-card-actions>
            <!-- <q-btn color="red" @click="$refs.maximizedModal.close()">Назад</q-btn> -->
          </q-card-actions>
        </q-card>

        <q-modal ref="minimizedModal" minimized :content-css="{padding: '50px'}">
          <social-sharing url="https://vuejs.org/" inline-template>
            <div class="network_flex">
              <network network="facebook">
                <i class="fa fa-fw fa-facebook"></i> Facebook
              </network>
              <network network="googleplus">
                <i class="fa fa-fw fa-google-plus"></i> Google +
              </network>
              <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i> Twitter
              </network>
              <network network="vk">
                <i class="fa fa-vk"></i> VKontakte
              </network>
            </div>
          </social-sharing>
          <q-btn color="red" @click="$refs.minimizedModal.close()" small>Отмена</q-btn>
        </q-modal>

      </q-modal>

    </div>

  </div>
</template>

<script>
import { todoStorage, recipeStorage } from '../store/localstore'
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
  Toast
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
    QModalLayout,
    Toast
  },

  data () {
    return {
      detalRecipe: [],
      detaliId: null,
      detaliTitle: null,
      detaliText: null,
      detaliSostav: null,
      detaliImg: null,
      detaliRecipe: null,
      detaliTimeCook: null,
      detaliCountPersons: null,
      detaliKall: null,
      detaliBelki: null,
      detaliJiri: null,
      detaliUglevodi: null,
      foodChips: [],
      todos: todoStorage.fetch(),
      recipe: recipeStorage.fetch()

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
            // return this.$store.state.recipes
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
      console.log(this.detaliRecipe[0])
      // this.detaliId = this.detaliRecipe[0].id
      // this.detaliTitle = this.detaliRecipe[0].title.rendered
      // this.detaliText = this.detaliRecipe[0].content.rendered
      // this.detaliSostav = this.detaliRecipe[0].acf.sostav
      // this.detaliImg = this.detaliRecipe[0].metadata.link_to_another_source[0]
      // this.detaliTimeCook = this.detaliRecipe[0].metadata.time_to_cook[0]
      // this.detaliKall = this.detaliRecipe[0].metadata.kkal[0]
      // this.detaliBelki = this.detaliRecipe[0].metadata.belki[0]
      // this.detaliJiri = this.detaliRecipe[0].metadata.jiri[0]
      // this.detaliUglevodi = this.detaliRecipe[0].metadata.uglevodi[0]
      // this.foodChips = this.detaliRecipe[0].tag_names
      this.detaliId = this.detaliRecipe[0].id
      this.detaliTitle = this.detaliRecipe[0].title.rendered
      this.detaliText = this.detaliRecipe[0].content.rendered
      this.detaliSostav = this.detaliRecipe[0].acf.sostav
      this.detaliImg = this.detaliRecipe[0].acf.link_to_another_source
      this.detaliTimeCook = this.detaliRecipe[0].acf.time_to_cook
      this.detaliCountPersons = this.detaliRecipe[0].acf.count_persons
      this.detaliKall = this.detaliRecipe[0].acf.kkal
      this.detaliBelki = this.detaliRecipe[0].acf.belki
      this.detaliJiri = this.detaliRecipe[0].acf.jiri
      this.detaliUglevodi = this.detaliRecipe[0].acf.uglevodi
      this.foodChips = this.detaliRecipe[0].tag_names
    },

    addList: function () {
      if (this.detaliTitle) {
        this.todos.push({
          name: this.detaliTitle,
          products: this.foodChips
        })
      }
    },

    savedRecipe: function () {
      if (this.detaliTitle) {
        this.recipe.push({
          id: this.detaliId,
          name: this.detaliTitle,
          text: this.detaliText,
          sostav: this.detaliSostav,
          img: this.detaliImg,
          timeCook: this.detaliTimeCook,
          kkal: this.detaliKall,
          belok: this.detaliBelki,
          fat: this.detaliJiri,
          uglevod: this.detaliUglevodi,
          products: this.foodChips
        })
      }
    },

    toastWithType (type, text) {
      if (type === 'positive') {
        Toast.create[type]({
          html: 'Добавленно в ' + text
        })
      }
    }

  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      }
    },
    recipe: {
      handler: function (recipe) {
        recipeStorage.save(recipe)
      }
    }
  }

}
</script>

<style>
.popup_detali__card .bt-30px {
  height: 30px;
  box-shadow: none;
  color: azure;
}

.popup_detali__card .bt-30px .q-icon {
  font-size: 24px;
}

.popup_detali__card .right,
.popup_detali__card .left {
  width: 50%;
}

.popup_detali__card .--reletive_text_step {
    position: relative;
    border-left: 4px solid #027be3;
}

.popup_detali__card .step-number {
background: #027be3;
    width: 26px;
    height: 26px;
    position: absolute;
    border-radius: 17px;
    line-height: 2.2;
    text-align: center;
    color: white;
    left: -16px;
    font-size: 12px;
}

.fl_right {
  float: right;
}

.fl_right i {
  margin-right: 0px;
}

.network_flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.network_flex span {
  width: 100%;
  display: block;
  margin-bottom: 5px;
  background: rgba(169, 169, 169, 0.2901960784313726);
  padding: 5px 10px;
}

.popup_detali__card {
  margin: 0px;
}

.popup_detali__card .detali_img {
  height: 320px;
  object-fit: cover;
}

.popup_detali__card .detali_actions--mod-absolute {
  position: absolute;
  top: 0px;
  z-index: 1;
  width: 100%;
  background-color: rgba(107, 107, 107, 0.5294117647058824);
}

.q-card-media  .progressive-image .progressive-image-main {
  position: initial;
}
</style>
