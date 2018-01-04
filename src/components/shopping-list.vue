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

      <p>Добавьте свой список покупок <q-icon name="shopping_cart" /></p>

      <div style="width: 500px; max-width: 90vw;">
        <q-input v-model="nameShoppingList" placeholder="Название списка продуктов" />
        <q-chips-input @click="check()" v-model="foodChips" class="no-margin" placeholder="Продукты"/>
        <q-btn class="bt-mt full-width" color="primary" icon="add_shopping_cart" @click="addTodo()">Сохранить список продуктов</q-btn>
      </div>
    </div>

    <div class="layout-padding card-examples row items-start">
        <q-card style="width: 100%;" inline v-for="(shopItemList, index) in todos" v-bind:key="index">
          <q-card-title>
            {{shopItemList.name}}
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-chip class="foodchip" tag square color="primary" v-for="(food, ifood) in shopItemList.products" v-bind:key="ifood">{{food}}</q-chip>
          </q-card-main>
          <q-card-separator />
            <q-card-actions>
              <q-btn flat v-on:click="deleteTodo(index)"><q-icon name="remove_shopping_cart" /> Удалить список</q-btn>
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
import { todoStorage } from '../store/localstore'
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
    QInnerLoading
  },

  directives: {
    BackToTop
  },

  data () {
    return {
      nameShoppingList: '',
      foodChips: [],
      shopList: [],
      test: [],
      todos: todoStorage.fetch()
    }
  },

  created: function () {

  },

  computed: {

  },

  methods: {
    send () {
      console.log(this.foodChips)
    },

    addTodo: function () {
      if (this.nameShoppingList) {
        this.todos.push({
          name: this.nameShoppingList,
          products: this.foodChips
        })
      }
      this.nameShoppingList = ''
      this.foodChips = []
    },

    deleteTodo: function (index) {
      this.todos.splice(index, 1)
    }

  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      }
    }
  }

}
</script>

<style>
.bt-mt {
  margin-top: 10px;
}

.foodchip {
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>
