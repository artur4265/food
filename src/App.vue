<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style>
.q-list-link > .q-item, .q-item-link {
    cursor: pointer;
    color: #7d7d7d;
}

.q-list-link > .q-item, .q-item-link i{
    padding-right: 10px;
}
</style>
