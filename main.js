const { app, BrowserWindow } = require('electron');
const shell = require('electron').shell;

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 482,
        frame: false,
        center: true,
        icon: __dirname + '/icon.ico',
        show: false
    });

    win.loadFile('index.html');

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null)
        createWindow();
});

app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
});