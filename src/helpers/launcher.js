const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

export default() => {
    let opts = {
        clientPackage: null,
        authorization: Authenticator.getAuth("username", "password"),
        root: "./ylauncher",
        version: {
            number: "1.16.5",
            type: "release"
        },
        memory: {
            max: "6G",
            min: "4G"
        }
    }
    launcher.launch(opts);
}