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
      <left-menu></left-menu>
    </div>

<!-- <router-view /> -->

    <div class="layout-padding docs-input row justify-center home-lay">

      <div class="home">
        <div class="logo">
          <img src="../assets/logo.svg">
        </div>
        <h2 class="welcome">What to cook</h2>
        <p>Приложение помогающие найти нужный рецепт блюда под имеющиеся Ваши продукты.</p>
      <q-side-link to="/news" class="go">Начать поиск</q-side-link>
      </div>


    </div>
  </q-layout>
</template>

<script>
import LeftMenu from './chunks/LeftMenu.vue'
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
  QSideLink
} from 'quasar'

export default {
  name: 'index',
  components: {
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
    'left-menu': LeftMenu
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  mounted () {

  },
  beforeDestroy () {

  }

}
</script>

<style>

.home-lay {
background: #00d2ff;  /* fallback for old browsers */
background: -webkit-linear-gradient(#3a7bd5, #00d2ff);
background: -moz-linear-gradient(#3a7bd5, #00d2ff);
background: -o-linear-gradient(#3a7bd5, #00d2ff);
background: linear-gradient(#3a7bd5, #00d2ff);
min-height: calc(100vh - 50px);
}

.home {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  max-height: 490px;
}

.home .logo img{
  width: 150px;
}

.home .welcome {
  padding: 12px;
  color: #2788cc;
  font-size: 2.8rem;
}

.home p {
    width: 310px;
    margin: 0 auto;
    font-weight: 500;
    color: #2788cc;
}
.home .go {
    background-color: #ffffff;
    padding: 12px;
    width: 200px;
    margin: 0 auto;
    border-radius: 25px;
    color: #2851aa;
    margin-top: 30px;
    text-transform: uppercase;
    text-shadow: 0px 0px 1px #2851aa;
    border: 2px solid #2851aa;
}

</style>
