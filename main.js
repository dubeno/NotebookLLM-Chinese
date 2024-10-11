const { app, BrowserWindow } = require('electron');
const { exec, execSync } = require('child_process');
const path = require('path');

let serverProcess; // 用于存储 Node.js 服务器的进程实例

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // 允许在 HTML 中访问 Node.js 模块
        },
    });

    win.loadFile('boke-google.html'); // 加载应用的 HTML 文件

    win.on('closed', () => {
        // 当窗口关闭时检查并关闭服务器进程
        if (serverProcess) {
            serverProcess.kill(); // 杀死子进程
            console.log('Node.js server process closed.');
        }
    });
}

app.whenReady().then(() => {
    // 启动 Node.js 服务器
    const serverPath = path.join(__dirname, 'proxy.js');
    serverProcess = exec(`node ${serverPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (serverProcess) {
            serverProcess.kill(); // 在退出前关闭服务器进程
            console.log('Node.js server process closed on app quit.');
        }
        app.quit(); // 退出应用
    }
});

// 在 macOS 上当重新激活应用时，重新创建窗口
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
