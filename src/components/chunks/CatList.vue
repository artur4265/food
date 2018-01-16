<template>
  <div class="catlist">
    <label class="imgcat" v-for="(cat, index) in catdata" v-bind:key="index" v-bind:for="cat.id">
      <img v-bind:src="cat.acf.cat_foto" alt="">
      <input type="radio" v-bind:id="cat.id" @change="show(cat.id)" name="rr" />
      <span></span>
      <p>{{cat.name}}</p>
    </label>
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

  data() {
    return {
      radio1: '',
      catdata: []
    }
  },

  created: function() {
    this.getCategorieslistTest()
  },

  methods: {
    show(val) {
      console.log(val)
    },

    getCategorieslistTest() {
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
  -o-object-fit: cover;
  position: relative;
  object-fit: cover;
  padding: 5px;
  margin: 3px;
  box-shadow: 0px 1px 2px 1px #00000036;
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
  line-height: 24px;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  bottom: 0px;
  width: calc(100% - 10px);
  background: white;
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
  background-color: #0f8ee47a;
  z-index: 4;
}
</style>
