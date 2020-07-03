import { desktopCapturer, Display, remote } from 'electron';
export default {
  async captureScreen() : Promise<{screen : Display, stream : MediaStream} | null> {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });/* .then(async sources => { */

    const source = sources.find(s => s.id.includes('screen:0'));
    console.log(source);
    if (!source) return null;

    const screen = remote.screen.getAllDisplays().find(d => d.id === parseInt(source.display_id));
    console.log(screen);
    if (!screen) return null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id,
            minWidth: 2560,
            maxWidth: 2560,
            minHeight: 1440,
            maxHeight: 1440
          }
        } as any
      });
      return { stream, screen };
    } catch (e) {
      console.error(e);
    }

    return null;
    // });
  }
};
