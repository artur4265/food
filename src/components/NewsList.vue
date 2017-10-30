<template>
  <div id="news-list">
    <p>news-list</p>
      <ul class="list_news">
        <li  v-for="hero in news"  v-bind:key="hero.id">
          <p>{{ hero.detali }}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    news () {
      return this.$store.state.news
    }
  }
}
</script>

<style>
</style>
