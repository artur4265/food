<template>
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-toolbar slot="header" class="glossy">
      <q-btn flat @click="$refs.layout.toggleLeft()">
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

          <!-- <cat-list></cat-list> -->
          <div class="catlist col" v-if="img_mode !== false">
            <label class="col-6 imgcat" v-for="(cat, index) in catdata" v-bind:key="index" v-bind:for="cat.id">
              <div class="imgcat_wrap">
                <!-- <img v-bind:src="cat.acf.cat_foto" alt=""> -->
                <progressive-img v-bind:src="cat.acf.cat_foto" :blur="30" 
                fallback="https://pp.userapi.com/c622226/v622226441/386c7/AH2NtK8sPN4.jpg"
                no-ratio/>
                <input type="radio" v-bind:id="cat.id" @change="getCatId(cat.id)" name="rr" />
                <span></span>
                <p>{{cat.name}}</p>
              </div>
            </label>
          </div>
          <q-dialog-select v-else stack-label="блюда" inverted color="amber" separator v-model="selectCat" :options="optionsCat" ok-label="Ок" cancel-label="Отмена" title="Блюда" />

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
                <q-chips-input @click="check()" v-model="foodChips" class="no-margin" placeholder="Продукты" />
              </q-item-main>
            </q-item>
          </q-list>

          <q-stepper-navigation v-if="!globalNavigation">
            <!--<q-btn color="primary" @click="$refs.stepper.goToStep('campaign')">Restart</q-btn>-->
            <q-btn color="primary" flat @click="$refs.stepper.previous(); resetRage();">Назад</q-btn>
            <q-btn class="full-width" loader color="primary" @click="simulateProgress" :disable="!progress">Начать поиск</q-btn>
          </q-stepper-navigation>
        </q-step>

        <q-stepper-navigation v-if="globalNavigation">
          <q-btn v-if="step !== 'campaign'" color="primary" flat @click="$refs.stepper.previous()">
            Back
          </q-btn>

          <q-btn color="primary" @click="$refs.stepper.next()">
            {{ step === 'create_ad' ? 'Finalize' : 'Next' }}
          </q-btn>
        </q-stepper-navigation>

        <q-inner-loading />
      </q-stepper>

      <news-list></news-list>

      <q-btn color="primary" round v-on:click="WpTotal()" v-if="pagination">ещё</q-btn>

    </div>

    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-btn color="primary" round v-back-to-top.animate="{offset: 50, duration: 200}" class="animate-pop">
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-fixed-position>

  </q-layout>
</template>

<script>

import NewsList from './NewsList.vue'
import LeftMenu from './chunks/LeftMenu.vue'
//  import CatList from './chunks/CatList.vue'
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
    'left-menu': LeftMenu
    //  'cat-list': CatList
  },

  directives: {
    BackToTop
  },

  data () {
    return {
      img_mode: true,
      step: 'first',
      step2: 'first',
      searchFoods: [],
      piceFood: null,
      foodChips: [],
      catdata: [],
      selectCat: '',
      progress: false,
      open: false,
      optionsCat: [],
      options: ['contractable', 'disable_payment', 'step_error'],
      pagination: false,
      page: 1,
      active: false
    }
  },

  created: function () {
    this.getCategorieslist()
    this.getCategorieslistTest()
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

    resetRage () {
      this.page = 1
    },

    WpTotal () {
      if (this.page < this.$store.state.wpTotal) {
        this.page += 1
        this.$http.get(this.$store.state.requests + '&page=' + this.page).then(response => {
          this.$store.commit('moreLoadRecipes', response.data)
        })
        if (this.page >= this.$store.state.wpTotal) {
          this.pagination = false
        }
      }
    },

    simulateProgress (e, done) {
      this.createRequest()
      // this.WpTotal()
      setTimeout(done, 1000)
    },

    getCategorieslistTest () {
      this.$http.get('https://look-cook.info/wp-json/wp/v2/categories/').then(response => {
        this.catdata = response.data
      })
    },

    getCatId (val) {
      this.selectCat = val
    },

    getCategorieslist () {
      this.$http.get('https://look-cook.info/wp-json/wp/v2/categories/').then(response => {
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
      var req = 'https://look-cook.info/wp-json/wp/v2/posts/'
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
        if (wpTotal > 1) {
          this.pagination = true
        }
        else {
          this.pagination = false
        }
      })

      // if (this.page = this.$store.state.wpTotal) {
      //   this.pagination = false
      // }

      this.$store.commit('setRequest', req + catPart + enteredProducts)
    }

  },

  destroyed: function () {
    var emptulist = []
    var emptureq = ''
    this.$store.commit('setRecipeslist', emptulist)
    this.$store.commit('setRequest', emptureq)
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
.catlist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.imgcat {
  position: relative;
}

.imgcat .imgcat_wrap {
  padding: 5px;
  margin: 3px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.21176470588235294);
}

.imgcat .progressive-image-main {
  position: initial;
}
.imgcat img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.imgcat p {
  font-size: 1rem;
  letter-spacing: 0;
  margin: 0;
  line-height: 35px;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  bottom: 4px;
  width: calc(100% - 16px);
  color: azure;
  background: rgba(0, 0, 0, 0.34);
}

.imgcat input[type="radio"] {
  display: none;
}

.imgcat input[type="radio"] {
  color: #f2f2f2;
  font-family: Arial, sans-serif;
}

.imgcat input[type="radio"]:checked+span {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0px;
  /* background-color: rgba(15, 142, 228, 0.53); */
  background: linear-gradient(to bottom, rgba(255, 0, 82, 0.45), rgba(0, 161, 255, 0.45));
  z-index: 4;
}
</style>
