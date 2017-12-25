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

      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>

          <q-side-link item to="/" exact>
            <q-item-main label="Home" />
          </q-side-link>

          <q-side-link item to="/news">
            <q-item-main label="Поиск рецептов"/>
          </q-side-link>

          <q-side-link item to="/shopping-list">
            <q-item-main label="Список покупок" />
          </q-side-link>


      </q-list>
    </div>



    <div class="layout-padding docs-input row justify-center">

      <p>Добавьте свой список покупок</p>

      <div style="width: 500px; max-width: 90vw;">
        <q-input v-model="nameShoppingList" placeholder="Название списка продуктов" />
        <q-chips-input @click="check()" v-model="foodChips" class="no-margin" placeholder="Продукты"/>
        <q-btn class="bt-mt" color="primary" icon="shopping_cart">Сохранить список продуктов</q-btn>
      </div>
    </div>

    <div class="layout-padding card-examples row items-start">
        <q-card style="width: 100%;" inline>
          <q-card-title>
            Title
          </q-card-title>
          <q-card-main>
            <q-chip tag square color="primary">баклажан</q-chip>
            <q-chip tag square color="primary">томат</q-chip>
          </q-card-main>
          <q-card-separator />
            <q-card-actions>
              <q-btn flat>Удалить список</q-btn>
            </q-card-actions>
        </q-card>
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
  QInnerLoading
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
    'news-list': NewsList
  },

  directives: {
    BackToTop
  },

  data () {
    return {
      nameShoppingList: '',
      step: 'first',
      step2: 'first',
      searchFoods: [],
      piceFood: null,
      foodChips: [],
      selectCat: '',
      progress: false,
      open: false,
      optionsCat: [],
      options: ['contractable', 'disable_payment', 'step_error']
    }
  },

  created: function () {

  },

  computed: {

  },

  methods: {
    send () {
      console.log(this.foodChips)
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
.bt-mt {
  margin-top: 10px;
}
</style>
