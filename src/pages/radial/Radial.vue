<template>
  <div>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      item: null as any,
      keyUpHandler: null as any
    };
  },
  created() {
    console.log('created');
    this.keyUpHandler = function(e:any) {
      console.log(e);
      this.item = e;
    };
    window.addEventListener('keyup', this.keyUpHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyUpHandler);
  }
});
</script>

<style>

</style>
