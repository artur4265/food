<template>
<div>
  <div class="imgcat" v-for="(cat, index) in catdata" v-bind:key="index">
    <p>{{cat.name}}</p>
    <q-radio v-model="radio1" @change="show()" v-bind:val="cat.url" />
  </div>
</div>
</template>

<script>

import {
  QRadio,
  QChip,
  QField,
  QList,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile,
  QOptionGroup
} from 'quasar'

export default {
  components: {
    QRadio,
    QChip,
    QField,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QOptionGroup
  },

  data () {
    return {
      radio1: '',
      catdata: [
        {name: '111', img: '/img/nia.625d1af.jpg', url: '111'},
        {name: '222', img: 'assets/nia.jpg', url: '222'},
        {name: '333', img: '../../assets/nia.jpg', url: '333'}
      ]
    }
  },

  methods: {
    show (val) {
      console.log(this.radio1)
    }
  }
}
</script>

<style>
</style>
