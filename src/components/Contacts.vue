<template>
  <div>
    Contacts
    <div v-html="form.content.rendered"></div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      form: []
    }
  },

  created: function () {
    this.getContact()
  },

  methods: {
    getContact () {
      this.$http.get('https://look-cook.info/wp-json/wp/v2/pages/96').then(response => {
        this.form = response.data
      })
    }
  }
}
</script>

<style>

</style>
