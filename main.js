const { app } = require("electron")
const Window = require("./Window")

function main() {
    let mainWindow = new Window({
        file: "index.html",
    })
}

app.whenReady().then(() => {
    main()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            main()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
