import { app, BrowserWindow, Menu, screen, Tray } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { showFloatingModal } from './window';
import { registerGlobalShortcuts } from './utils/shortcut-utils';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;
let tray: Tray | null = null;
let isQuiting: boolean = false;

function createWindow() {
    win = new BrowserWindow({
        width: 780,
        height: 500,
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    });
    // 트레이 아이콘 등록 (최초 1회만)
    if (!tray) {
        tray = new Tray(path.join(process.env.VITE_PUBLIC, 'tray-icon.png')); // 아이콘 파일 경로
        const contextMenu = Menu.buildFromTemplate([
            { label: '열기', click: () => win?.show() },
            { label: '종료', click: () => app.quit() },
        ]);
        tray.setToolTip('번역 앱');
        tray.setContextMenu(contextMenu);

        tray.on('click', () => {
            win?.isVisible() ? win.hide() : win?.show();
        });
    }

    app.on('before-quit', () => {
        isQuiting = true;
    });

    win.on('close', (event) => {
        if (!isQuiting) {
            event.preventDefault();
            win?.hide();
        }
        // isQuiting === true 이면 그냥 종료 허용
    });

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString());
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
        // win.webContents.openDevTools();
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'));
    }

    // ✅ 글로벌 단축키 등록
    app.whenReady().then(() => {
        registerGlobalShortcuts('CommandOrControl+Shift+T', () => {
            const cursor = screen.getCursorScreenPoint();

            showFloatingModal();
            win?.webContents.send('toggle-translate-modal', cursor);
        });
    });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        win = null;
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
