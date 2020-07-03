<template>
  <div>
    <canvas
      :width="captureWidth * displayWidthModifier"
      :height="captureHeight * displayHeightModifier"
      ref="canvas"
    ></canvas>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import CaptureScreen from '@/electron/renderer/capture-screen';

export default Vue.extend({
  data() {
    return {
      x: 414,
      y: 1425,
      captureWidth: 295,
      captureHeight: 10,
      displayWidthModifier: 1,
      displayHeightModifier: 2
    };
  },
  created() {
    console.log('created');
  },
  async mounted() {
    const { stream, screen } = await CaptureScreen.captureScreen() || {};
    if (stream == null || screen == null) return;

    const canvas = this.getCanvas();
    const ctx = canvas.getContext('2d');
    const availTop = (window.screen as any).availTop - screen.bounds.y;

    this.getVideo(stream).then((video: HTMLVideoElement) => {
      if (!video || video.paused || video.hidden || video.ended) return false;

      // setInterval(() =>
      // , 500);

      ctx!.drawImage(
        video,
        this.x,
        this.y,
        this.captureWidth,
        this.captureHeight,
        0,
        0,
        this.captureWidth * this.displayWidthModifier,
        this.captureHeight * this.displayHeightModifier);
    });

    //
    // const video = (this.$refs.video as any);
    // video.srcObject = stream;
    // video.onloadedmetadata = (e:any) => video.play();
  },
  methods: {
    getCanvas() : HTMLCanvasElement {
      return this.$refs.canvas as HTMLCanvasElement;
    },
    async getVideo(stream: MediaStream): Promise<HTMLVideoElement> {
      const video = document.createElement('video');
      video.autoplay = true;
      video.srcObject = stream;
      return new Promise(resolve => {
        video.addEventListener('playing', () => {
          resolve(video);
        });
      });
    }
  },
  beforeDestroy() {

  }
});
</script>

<style>

</style>
