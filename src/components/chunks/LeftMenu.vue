<template>
  <div id="left-menu">
      <q-list no-border link inset-delimiter>
        <q-list-header class="bg-blue-4 text-white">What to Cook</q-list-header>

          <q-side-link item to="/" exact>
            <q-icon size="22px" name="ion-home" />
            <q-item-main label="Главная" />
          </q-side-link>

          <q-side-link item to="/news">
            <q-icon size="22px" name="ion-search" />
            <q-item-main label="Поиск рецептов"/>
          </q-side-link>

          <q-side-link item to="/shopping-list">
            <q-icon size="22px" name="ion-android-cart" />
            <q-item-main label="Список покупок" />
          </q-side-link>

          <q-side-link item to="/saved-recipes">
            <q-icon size="22px" name="ion-heart" />
            <q-item-main label="Сохраненные рецепты" />
          </q-side-link>

          <q-side-link separator item to="/shopping-list">
            <q-icon size="22px" name="ion-gear-b" />
            <q-item-main label="Настройки" />
          </q-side-link>

          <q-side-link item to="/shopping-list">
            <q-icon size="22px" name="ion-help-circled" />
            <q-item-main label="FAQ" />
          </q-side-link>

          <q-side-link item to="/contacts">
            <q-icon size="22px" name="ion-android-chat" />
            <q-item-main label="Контакты" />
          </q-side-link>

      </q-list>
  </div>
</template>

<script>
import {
  QLayout,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink
} from 'quasar'

export default {

  components: {
    QLayout,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
