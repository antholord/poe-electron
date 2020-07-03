
import Vue from 'vue';
import * as Electron from 'electron';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $electron: typeof Electron
  }
}
