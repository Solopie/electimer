const { BrowserWindow } = require("electron")
const path = require("path")

const defaultProps = {
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
    },
}

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings })

        this.loadFile(file)
        this.webContents.openDevTools()

        this.once("ready-to-show", () => {
            this.show()
        })
    }
}

module.exports = Window
