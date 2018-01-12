<template>
<div class="catlist">
  <div class="imgcat" v-for="(cat, index) in catdata" v-bind:key="index">
    <p>{{cat.name}}</p>
    <img v-bind:src="cat.acf.cat_foto" alt="">
    <q-radio v-model="radio1" @change="show()" v-bind:val="cat.id" />
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
      catdata: []
    }
  },

  created: function () {
    this.getCategorieslistTest()
  },

  methods: {
    show (val) {
      console.log(this.radio1)
    },

    getCategorieslistTest () {
      this.$http.get('http://mob.4bstudio.com.ua/wp-json/wp/v2/categories/').then(response => {
        this.catdata = response.data
      })
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
width: 48%;
    /* height: 100px; */
    -o-object-fit: cover;
    position: relative;
    object-fit: cover;
    padding: 5px;
    margin: 3px;
    box-shadow: 0px 1px 2px 1px #00000036;
}

.imgcat img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.imgcat p {
    font-size: 1rem;
    letter-spacing: 0;
    margin: 0 0 1rem;
    line-height: 24px;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    position: absolute;
}
</style>
