import { screen, BrowserWindow, app, globalShortcut } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
let floatingModal = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename);
function showFloatingModal() {
  const cursor = screen.getCursorScreenPoint();
  if (floatingModal) {
    floatingModal.close();
  }
  floatingModal = new BrowserWindow({
    width: 400,
    height: 200,
    x: cursor.x + 10,
    y: cursor.y + 10,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    focusable: true,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      contextIsolation: true
    }
  });
  floatingModal.loadURL(`${VITE_DEV_SERVER_URL}#/translate-modal`);
}
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  app.whenReady().then(() => {
    const success = globalShortcut.register("CommandOrControl+Shift+T", () => {
      const cursor = screen.getCursorScreenPoint();
      showFloatingModal();
      win == null ? void 0 : win.webContents.send("toggle-translate-modal", cursor);
    });
    if (!success) {
      console.error("❌ 글로벌 단축키 등록 실패");
    } else {
      console.log("✅ 단축키 등록 성공");
    }
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
