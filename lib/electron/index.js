const { app, BrowserWindow, ipcMain } = require("electron");

let currentUser = null;
const messages = [];
// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg); // prints "ping"
//     event.returnValue = {payload: 'message successfully sent'}
// });

function createWindow() {
  let win = new BrowserWindow({ width: 800, height: 800 });

  win.loadFile("./public/login.html");


  ipcMain.on("asynchronous-message", (event, arg) => {
    console.log(arg.payload); // prints out payload from public/js/index.js
    switch (arg.type) {
      case "login":
        currentUser = arg.payload;
        win.loadFile('public/index.html');
        return event.sender.send("asynchronous-reply", {
          type: 'login',
          payload: messages
        });
    }
    event.sender.send("asynchronous-reply", {
      payload: "me   ssage successfully sent"
    });
  });

}

module.exports = {
  init: function init() {
    app.on("ready", createWindow);
  }
};
