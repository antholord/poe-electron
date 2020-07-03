<template>
  <div>
    <h1>{{ item }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      item: null as any
    };
  },
  created() {
    console.log('created iteminfo');
    this.item = this.$electron.clipboard.readText();
  }
});
</script>

<style>

</style>
