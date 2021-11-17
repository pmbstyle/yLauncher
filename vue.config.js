module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
        builderOptions: {
          appId: 'com.ylauncher.app',
          productName: 'yLauncher',
          artifactName: '${productName}-Setup-${version}-${os}-${arch}.${ext}',
          publish: [{provider: 'github', private: false, releaseType: 'release'}],
          copyright: 'Copyright © 2021 Eternal Games',
          win: {
            icon: './icon.ico',
            target: 'squirrel'
          },
          squirrelWindows: {
            iconUrl: 'http://ytyacraft.ru/images/icon.ico',
            loadingGif: './setup.gif'
          },
          linux: {
            executableName: 'yLauncher',
          }
        }
      }
    }
}