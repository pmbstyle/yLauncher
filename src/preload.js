const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            console.log(channel, data)
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(data);
            }
        }
    }
);

window.ipcRenderer = ipcRenderer