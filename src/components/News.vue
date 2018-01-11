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

       


      <q-stepper flat ref="stepper" v-model="step" color="primary" :alternative-labels="alt">
              <q-step default name="campaign" title="Категория блюд">
                <p>Выберите категорию рецептов</p>
                <cat-list></cat-list> 
                <q-dialog-select
                        stack-label="блюда"
                        inverted
                        color="amber"
                        separator
                        v-model="selectCat"
                        :options="optionsCat"
                        ok-label="Ок"
                        cancel-label="Отмена"
                        title="Блюда"
                      />

                <q-stepper-navigation v-if="!globalNavigation">
                  <q-btn color="primary" @click="$refs.stepper.next()">Продолжить</q-btn>
                </q-stepper-navigation>
              </q-step>


              <q-step name="create_ad" title="Ингридиенты">

                <p class="caption">Добавьте название продуктов</p>

                <q-list>
                  <q-item multiline>
                    <q-item-side icon="edit" />
                    <q-item-main>
                      <q-chips-input @click="check()" v-model="foodChips" class="no-margin" placeholder="Продукты"/>
                    </q-item-main>
                  </q-item>
                </q-list>


                <q-stepper-navigation v-if="!globalNavigation">
                  <!--<q-btn color="primary" @click="$refs.stepper.goToStep('campaign')">Restart</q-btn>-->
                  <q-btn color="primary" flat @click="$refs.stepper.previous()">Назад</q-btn>
                  <q-btn  class="full-width" loader color="primary" @click="simulateProgress" :disable="!progress">Начать поиск</q-btn>
                </q-stepper-navigation>
              </q-step>

              <q-stepper-navigation v-if="globalNavigation">
                <q-btn
                  v-if="step !== 'campaign'"
                  color="primary"
                  flat
                  @click="$refs.stepper.previous()"
                >
                  Back
                </q-btn>

                <q-btn color="primary" @click="$refs.stepper.next()">
                  {{ step === 'create_ad' ? 'Finalize' : 'Next' }}
                </q-btn>
              </q-stepper-navigation>

              <q-inner-loading />
            </q-stepper>

      <news-list></news-list>

      <q-btn color="primary" round v-on:click="WpTotal()"  v-if="pagination" >more</q-btn>

    </div>

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn
          color="primary"
          round
          v-back-to-top.animate="{offset: 50, duration: 200}"
          class="animate-pop"
        >
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-fixed-position>


  </q-layout>

</template>

<script>

import NewsList from './NewsList.vue'
import LeftMenu from './chunks/LeftMenu.vue'
import CatList from './chunks/CatList.vue'
import {
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
  QPagination
} from 'quasar'

export default {

  components: {
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
    QPagination,
    'news-list': NewsList,
    'left-menu': LeftMenu,
    'cat-list': CatList
  },

  directives: {
    BackToTop
  },

  data () {
    return {
      step: 'first',
      step2: 'first',
      searchFoods: [],
      piceFood: null,
      foodChips: [],
      selectCat: '',
      progress: false,
      open: false,
      optionsCat: [],
      options: ['contractable', 'disable_payment', 'step_error'],
      pagination: false,
      page: 1
    }
  },

  created: function () {
    this.getCategorieslist()
  },

  computed: {

    alt () {
      return this.options.includes('alt')
    },

    globalNavigation () {
      return this.options.includes('global_navigation')
    }

  },

  methods: {
    WpTotal () {
      if (this.page < this.$store.state.wpTotal) {
        this.page += 1
      }
      // this.createRequest('&page' + this.page)
      console.log(this.page)
      console.log(this.$store.state.wpTotal)
    },

    simulateProgress (e, done) {
      this.createRequest()
      // this.WpTotal()
      setTimeout(done, 1000)
    },

    getCategorieslist () {
      this.$http.get('http://mob.4bstudio.com.ua/wp-json/wp/v2/categories/').then(response => {
        var catFiltered = response.data.map(function (catIdName) {
          return {
            label: catIdName.name,
            value: `${catIdName.id}`
          }
        })
        this.$store.commit('setCategorieslist', catFiltered)
        this.optionsCat = this.$store.state.categories
        this.selectCat = '1'
      })
    },

    createRequest () {
      console.log(this.$store.state.requests)
      var req = 'http://mob.4bstudio.com.ua/wp-json/wp/v2/posts/'
      var catPart = '?categories=' + this.selectCat
      var enteredProducts
      if (this.foodChips.length < 1) {
        enteredProducts = ''
      }
      else {
        enteredProducts = '&filter[s]=' + this.foodChips
      }

      this.$http.get(req + catPart + enteredProducts).then(res => {
        var wpTotal = res.headers.get('x-wp-totalpages')
        this.$store.commit('setWpTotal', wpTotal)
      })

      if (this.$store.state.wpTotal > 1) {
        this.pagination = true
      }

      this.$store.commit('setRequest', req + catPart + enteredProducts)
      // console.log(this.$store.state.requests + this.selectCat + enteredProducts)
    }

  },

  watch: {
    foodChips: function (params) {
      if (this.foodChips.length >= 1) {
        this.progress = true
      }
      else {
        this.progress = false
      }
    }
  }

}
</script>

<style>
</style>
