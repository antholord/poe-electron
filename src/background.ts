'use strict';
import { WindowContainer } from './electron/definitions';

import { app, protocol, BrowserWindow, globalShortcut, session, ipcMain } from 'electron';
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
import ElectronUtils from './electron/electron-utils';
import radialMenu from './electron/browser-windows/radial-menu';
import flaskWindow from './electron/browser-windows/flask-window';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

const windows: WindowContainer = {
  main: null as BrowserWindow | null
};

function setUserAgent() {
  const generatedUserAgent = 'test';
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = generatedUserAgent;
    // eslint-disable-next-line standard/no-callback-literal
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow(winName: string, devPath:string = '', prodPath:string = 'index.html') {
  // Create the browser window.
  console.log('creating new window ' + winName);
  windows[winName] = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION === 'true' || true,
      webSecurity: false
    }
  });
  ElectronUtils.loadUrl(windows[winName]!, devPath, prodPath);

  windows[winName]!.on('closed', () => {
    console.log('closing');
    windows[winName] = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows.main === null) {
    console.log('creating main window on activate');
    createWindow('main');
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  console.log('ready, creating main');
  createWindow('main');
  setUserAgent();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+F1', () => {
    radialMenu.createWindow(windows);
  });
  globalShortcut.register('CommandOrControl+F2', () => {
    flaskWindow.createWindow(windows);
  });
});

ipcMain.on('close-window', (event, arg) => {
  if (arg === 'radial' && windows[arg]) {
    windows[arg]!.close();
  }
});
