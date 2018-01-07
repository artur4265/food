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


    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
<router-view />
    <div class="layout-padding logo-container non-selectable no-pointer-events">
      <!-- <div class="logo">
        <img src="~assets/home.png">
        <q-side-link to="/news" icon="rss feed" label="Twitter">Начать поиск рецептов</q-side-link>
      </div> -->
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

<style lang="stylus">

</style>
