import { WindowContainer } from './../definitions';
import { BrowserWindow } from 'electron';
import ElectronUtils from '../electron-utils';

const windowName = 'radial';
const utils = ElectronUtils;

const lastHit = Date.now();

const closeWindowAfterDelay = () => {
  setInterval(() => {
    if (Date.now() - lastHit > 500) {
      // winContainer[windowName].close();
      // winContainer[windowName] = null;
    }
  }, 200);
};

export default {
  createWindow(winContainer: WindowContainer): BrowserWindow {
    if (winContainer[windowName] === undefined) {
      winContainer[windowName] = null;
    }
    // Create the browser window.
    if (winContainer[windowName] == null) {
      winContainer[windowName] = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        y: 650,
        x: 1200,
        transparent: true,
        movable: true,
        opacity: 0.3,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false
        }
      });
      const radialWindow = winContainer[windowName]!;

      radialWindow.removeMenu();
      radialWindow.setAlwaysOnTop(true, 'pop-up-menu');

      utils.loadUrl(radialWindow, 'radial', 'radial');
    } else {
      winContainer[windowName]!.show();
    }

    winContainer[windowName]!.once('closed', () => {
      winContainer[windowName] = null;
    });

    return winContainer[windowName]!;
  },
  radialEventHandler() {
    const timeSinceLastHit = Date.now() - lastHit;
    console.log(timeSinceLastHit);
    // if (timeSinceLastHit > 500) {

    // }
  }
};
