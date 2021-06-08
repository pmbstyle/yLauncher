module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
        builderOptions: {
          appId: 'com.ylauncher.app',
          productName: 'ylauncher',
          artifactName: '${productName} Setup ${version}.${ext}',
          copyright: 'Copyright © 2021 ytyaCraft',
          win: {
            icon: './icon.ico',
            target: 'squirrel'
          }
        }
      }
    }
}