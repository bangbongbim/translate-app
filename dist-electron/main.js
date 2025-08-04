import { screen, BrowserWindow, globalShortcut, app, Tray, Menu } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
let floatingModal = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename);
function showFloatingModal() {
  const cursor = screen.getCursorScreenPoint();
  if (!floatingModal || floatingModal.isDestroyed()) {
    floatingModal = new BrowserWindow({
      width: 500,
      height: 500,
      x: cursor.x + 10,
      y: cursor.y + 10,
      frame: true,
      transparent: false,
      alwaysOnTop: true,
      resizable: true,
      skipTaskbar: true,
      focusable: true,
      webPreferences: {
        preload: path.join(__dirname$1, "preload.mjs"),
        contextIsolation: true
      }
    });
    floatingModal.on("closed", () => {
      floatingModal = null;
    });
    floatingModal.webContents.openDevTools();
    floatingModal.loadURL(`${VITE_DEV_SERVER_URL}#/translate-modal`);
  } else {
    floatingModal.setPosition(cursor.x + 10, cursor.y + 10);
    floatingModal.show();
    floatingModal.focus();
  }
}
const registerGlobalShortcuts = (shortcut, callback) => {
  try {
    const success = globalShortcut.register(shortcut, callback);
    if (!success) {
      console.error(`❌ 단축키 등록 실패: "${shortcut}"`);
    } else {
      console.log(`✅ 단축키 등록 성공: "${shortcut}"`);
    }
  } catch (err) {
    console.error(`❌ 단축키 등록 중 예외 발생: ${shortcut}`, err);
  }
};
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let tray = null;
let isQuiting = false;
function createWindow() {
  win = new BrowserWindow({
    width: 780,
    height: 500,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (!tray) {
    tray = new Tray(path.join(process.env.VITE_PUBLIC, "tray-icon.png"));
    const contextMenu = Menu.buildFromTemplate([
      { label: "열기", click: () => win == null ? void 0 : win.show() },
      { label: "종료", click: () => app.quit() }
    ]);
    tray.setToolTip("번역 앱");
    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
      (win == null ? void 0 : win.isVisible()) ? win.hide() : win == null ? void 0 : win.show();
    });
  }
  app.on("before-quit", () => {
    isQuiting = true;
  });
  win.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault();
      win == null ? void 0 : win.hide();
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  app.whenReady().then(() => {
    registerGlobalShortcuts("CommandOrControl+Shift+T", () => {
      const cursor = screen.getCursorScreenPoint();
      showFloatingModal();
      win == null ? void 0 : win.webContents.send("toggle-translate-modal", cursor);
    });
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
