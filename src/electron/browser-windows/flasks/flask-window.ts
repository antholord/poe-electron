import { WindowContainer } from '../definitions';
import { BrowserWindow } from 'electron';
import ElectronUtils from '../electron-utils';

const windowName = 'flasks';
const utils = ElectronUtils;

export default {
  createWindow(winContainer: WindowContainer): BrowserWindow {
    if (winContainer[windowName] === undefined) {
      winContainer[windowName] = null;
    }
    // Create the browser window.
    if (winContainer[windowName] == null) {
      winContainer[windowName] = new BrowserWindow({
        width: 350,
        height: 200,
        frame: false,
        y: 265,
        x: 850,
        transparent: true,
        movable: false,
        resizable: false,
        opacity: 1,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false
        }
      });
      const flasksWindow = winContainer[windowName]!;

      flasksWindow.removeMenu();
      flasksWindow.setAlwaysOnTop(true, 'pop-up-menu');
      flasksWindow.setIgnoreMouseEvents(true, { forward: true });

      utils.loadUrl(flasksWindow, 'flasks', 'flasks');
    } else {
      if (winContainer[windowName]?.isVisible()) {
        winContainer[windowName]!.close();
        winContainer[windowName] = null;
      } else {
        winContainer[windowName]!.show();
      }
    }

    winContainer[windowName]!.once('closed', () => {
      winContainer[windowName] = null;
    });

    return winContainer[windowName]!;
  }
};
