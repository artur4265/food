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
        Quasar App food
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">

      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>

        <q-item>
          <q-side-link to="/" icon="rss feed" label="Twitter">Go to Home</q-side-link>
        </q-item>

      </q-list>
    </div>



    <div class="layout-padding docs-input row justify-center">

      <p class="caption">Выберите категорию рецептов</p>

      <q-dialog-select
        stack-label="Delimited options"
        inverted
        color="amber"
        separator
        v-model="selectCat"
        :options="optionsCat"
      />

    <p class="caption">Добавьте название продуктов</p>

      <q-list>
        <q-item multiline>
          <q-item-side icon="edit" />
          <q-item-main>
            <q-chips-input @click="check()" v-model="foodChips" class="no-margin" placeholder="Продукты"/>
          </q-item-main>
        </q-item>
      </q-list>

      <q-btn  class="full-width" loader color="secondary" @click="simulateProgress" >Начать поиск</q-btn>


      <news-list></news-list>

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
  QModalLayout
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
    'news-list': NewsList
  },

  directives: {
    BackToTop
  },

  data () {
    return {
      searchFoods: [],
      piceFood: null,
      foodChips: [],
      selectCat: 'Все',
      progress: true,
      open: false,
      optionsCat: [
        {
          label: 'Все категории',
          value: 'Все'
        },
        {
          label: 'Супы',
          value: 'супы'
        },
        {
          label: 'Десерт',
          value: 'десерт'
        },
        {
          label: 'Завтрак',
          value: 'завтрак'
        },
        {
          label: 'Салат',
          value: 'салат'
        }
      ]

    }
  },
  methods: {

    send () {
      console.log(this.foodChips)
    },

    simulateProgress (e, done) {
      // simulate a delay
      console.log(this.foodChips)
      setTimeout(done, 1000)
    }

  },

  watch: {
    foodChips: function (params) {
      if (this.foodChips.length >= 3) {
        this.progress = false
        console.log(this.foodChips.length)
        console.log(this.foodChips)
      }
    }
  }

}
</script>

<style>
</style>
