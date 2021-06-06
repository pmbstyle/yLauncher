'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const electronOauth2 = require('electron-oauth2')
const path = require("path")
const fs = require("fs")
const mongoose = require('mongoose')
const profileModel = require('./models/profile')
const authWindowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }
}
const oauthConfig = {
    clientId: process.env.VUE_APP_DISCORD_CLIENT_ID,
    clientSecret: process.env.VUE_APP_DISCORD_CLIENT_SECRET,
    authorizationUrl: 'https://discord.com/api/oauth2/authorize',
    tokenUrl: 'https://discord.com/api/oauth2/token',
    useBasicAuthorizationHeader: false,
    // don't touch me
    redirectUri: 'http://localhost'
}
const discordOAuth = electronOauth2(oauthConfig, authWindowParams)

mongoose.connect(process.env.VUE_APP_MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Alarm!')
    console.log(err)
})

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 768,
    transparent: true,
    resizable: false,
    frame:false,
    useContentSize: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  ipcMain.on('login-window', () => {
    win.setSize(650, 650)
  })
  ipcMain.on('window-min', function () {
    win.minimize();
  })
  //Maximize the login window 
  ipcMain.on('window-max', function () {
      if (win.isMaximized()) {
          win.restore();
      } else {
          win.maximize();
      }
  })
  ipcMain.on('window-close', function () {
      win.close();
  })
  ipcMain.on('discord-oauth', (event, arg) => {
      discordOAuth.getAccessToken({
        scope: 'identify'
      })
      .then(auth => {
        event.sender.send('discord-oauth-reply', auth);
      }, err => {
        console.log('Error while getting token', err);
      })
  })
  ipcMain.on('check-discord-account', async (event, arg) => {
      let profileData
      try {
          profileData = await profileModel.findOne({discordID: arg.username+'#'+arg.discriminator})
          event.sender.send('user-confirm', {discordID:profileData.discordID,minecraftID:profileData.minecraftID});
      } catch (err) {
          console.log(err)
      }
  })
  ipcMain.on('check-mojang-account', async (event, arg) => {
      let profileData
      try {
          profileData = await profileModel.findOne({minecraftID: arg})
          if(profileData) {
            event.sender.send('user-confirm', {
              discordID:profileData.discordID,
              minecraftID:profileData.minecraftID
            });
          } else {
            event.sender.send('user-confirm', null)
          }
      } catch (err) {
          console.log(err)
      }
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
