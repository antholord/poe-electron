<template>
  <div>
    <h1>{{ item }}</h1>a
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const { remote } = require('electron');

export default Vue.extend({
    data() {
        return {
            item: null as any
        }
    },
    created() {
        //console.log(this.$electron.remote);
        // this.$electron.clipboard.writeText("a");
        // //this.item = clipboard.readText();
        // console.log(this.item);
    }
})
</script>

<style>

</style>
