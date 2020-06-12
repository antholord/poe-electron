import { BrowserWindow } from 'electron'

export default class ElectronUtils {
    public static loadUrl(win: BrowserWindow, devPath: string, prodPath: string): void {
      console.log("loading url");
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            // Load the url of the dev server if in development mode
            console.log(process.env.WEBPACK_DEV_SERVER_URL + devPath);
            win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
            if (!process.env.IS_TEST) win.webContents.openDevTools()
          } else {
            console.log(`app://./${prodPath}`);
            // Load the index.html when not in development
            win.loadURL(`app://./${prodPath}`)
          }
    }
}