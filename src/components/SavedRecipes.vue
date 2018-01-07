<template>

  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Wath to Cook
        <div slot="subtitle">v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <left-menu></left-menu>
    </div>

    <div class="layout-padding docs-input row justify-center">

      <p>Сохраненные рецепты <q-icon name="favorite_border" /></p>


      <q-card inline v-for="(recipe, index) in recipes"  v-bind:key="index">
        <q-card-media v-if="recipe.img !== false">
          <img v-bind:src="recipe.img">
        </q-card-media>
        <q-card-media v-else>
          <img src="../assets/nia.jpg">
        </q-card-media>
        <q-card-title>
          {{ recipe.name }}
        </q-card-title>
        <q-card-actions>
          <q-btn outline color="primary" @click="$refs.maximizedModal.open(); getDetaliRecipe(recipe.id);">смотреть</q-btn>
          <q-btn outline color="primary" v-on:click="deleteRecipe(index);">удалить</q-btn>
        </q-card-actions>
      </q-card>


      <q-modal ref="maximizedModal" maximized :content-css="{padding: '5px'}">
        <q-card>
        
          <q-card-actions>
            <div class="left">
              <q-btn color="primary" class="bt-30px"  @click="$refs.maximizedModal.close()" small><q-icon name="reply"/></q-btn>
            </div>
            <div class="right">
              <q-btn class="fl_right bt-30px" slot="right" icon="more_vert" name="more_vert" small>
                  <q-popover ref="popover">
                    <q-list link class="no-border">
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

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn
          color="primary"
          round
          v-back-to-top.animate="{offset: 50, duration: 200}"
          class="animate-pop">
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-fixed-position>







  </q-layout>

</template>

<script>
import LeftMenu from './chunks/LeftMenu.vue'
import { todoStorage, recipeStorage } from '../store/localstore'
import {
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink,
  QField,
  QOptionGroup,
  QChip,
  QInput,
  QChipsInput,
  QRadio,
  QDialogSelect,
  BackToTop,
  QFixedPosition,
  QModal,
  QModalLayout,
  QStepper,
  QStep,
  QStepperNavigation,
  QInnerLoading,
  QCollapsible,
  QPopover,
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
    QLayout,
    QOptionGroup,
    QField,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    QChip,
    QInput,
    QChipsInput,
    QRadio,
    QDialogSelect,
    QFixedPosition,
    QModal,
    QModalLayout,
    QStepper,
    QStep,
    QStepperNavigation,
    QInnerLoading,
    QCollapsible,
    QPopover,
    Toast,
    'left-menu': LeftMenu
  },

  directives: {
    BackToTop
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
      detaliKall: null,
      detaliBelki: null,
      detaliJiri: null,
      detaliUglevodi: null,
      foodChips: [],
      todos: todoStorage.fetch(),
      recipes: recipeStorage.fetch()
    }
  },

  methods: {
    getDetaliRecipe: function (id) {
      console.log(id)
      var filterRecipe = this.recipes

      function checkId (recipe) {
        return recipe.id === id
      }
      this.detaliRecipe = Object.values(filterRecipe.filter(checkId))
      this.detaliId = this.detaliRecipe[0].id
      this.detaliTitle = this.detaliRecipe[0].name
      this.detaliText = this.detaliRecipe[0].text
      this.detaliSostav = this.detaliRecipe[0].sostav
      this.detaliImg = this.detaliRecipe[0].img
      this.detaliTimeCook = this.detaliRecipe[0].timeCook
      this.detaliKall = this.detaliRecipe[0].kkal
      this.detaliBelki = this.detaliRecipe[0].belok
      this.detaliJiri = this.detaliRecipe[0].fat
      this.detaliUglevodi = this.detaliRecipe[0].uglevod
      this.foodChips = this.detaliRecipe[0].products
    },

    addList: function () {
      if (this.detaliTitle) {
        this.todos.push({
          name: this.detaliTitle,
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
    },

    deleteRecipe: function (index) {
      this.recipes.splice(index, 1)
    }
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      }
    },
    recipes: {
      handler: function (recipe) {
        recipeStorage.save(recipe)
      }
    }
  }
}
</script>

<style>
.bt-30px {
  height: 30px;
}

.right, .left {
  width: 50%;
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
  background: #a9a9a94a;
  padding: 5px 10px;
}
</style>
