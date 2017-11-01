<template>
  <div id="news-list">
    <p>news-list</p>
      <ul class="list_news">
        <li  v-for="hero in news"  v-bind:key="hero.id">
          <p>{{ hero.detali }}</p>
        </li>
      </ul>

<p>test</p>
      <ul class="list_news">
        <li  v-for="test in tests"  v-bind:key="test.id">
          <p>{{ test.id }}</p>
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
      this.$http.get('http://jsonplaceholder.typicode.com/posts').then(response => {
      // get body data
       //console.log(response.body)
        this.$store.commit('setTestlist', response.data)
        
        return this.$store.state.testlist
      })
    }
  },

  mounted () {
    //console.log(4444)
    // this.http.get()
    // axios.get('my-api')
    //   .then(response => {
    //       this.$store.commit('setUser', response.data.user) // set the user in the store
    //   })

    //   console.log(this.$store.state.user) // access the user
  }

}
</script>

<style>
</style>
