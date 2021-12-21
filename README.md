
![ytyacraft](https://eternalrpg.com/logo-sm-square-ico.png)

    
# yLauncher

Custom Minecraft launcher for Eternal RPG server


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VUE_APP_WEB_API_GATE`

`VUE_APP_AZURE_CLIENT_ID`

`VUE_APP_MICROSOFT_REDIRECT`

`VUE_APP_DISTRO_HOST`

`GH_TOKEN` (release only)

  
## Dev Server & Build

To run dev server use those commands

```bash
yarn
yarn electron:serve
```

To build project run

```bash
yarn electron:build
```
It will create win installer

To build and publish new release run

```bash
yarn build-and-publish
```
  
## Related

Here are some related projects

[Electron](https://github.com/electron/electron)

[Vue CLI Plugin Electron Builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)

[Minecraft Launcher Core](https://github.com/Pierce01/MinecraftLauncher-core)  
