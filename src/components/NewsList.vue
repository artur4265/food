<template>
  <div id="news-list">
    <!-- <p>news-list</p>
      <ul class="list_news">
        <li  v-for="hero in news"  v-bind:key="hero.id">
          <p>{{ hero.detali }}</p>
        </li>
      </ul> -->

<p>test</p>
      <ul class="list_news">
        <li  v-for="test in tests"  v-bind:key="test.id">
          <p>{{ test.id }} --- {{ test.title.rendered }}</p>
          <div v-html="test.content.rendered"></div>
        </li>
      </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  computed: {
    news () {
      return this.$store.state.news
    },
    tests () {
      return this.$store.state.testlist
    }
  },

  created: function () {
    this.getTestlist()
  },

  methods: {
    getTestlist () {
      this.$http.get('http://md/wp-json/wp/v2/posts/').then(response => {
        this.$store.commit('setTestlist', response.data)
        return this.$store.state.testlist
      })
    }
  }

}
</script>

<style>
</style>
