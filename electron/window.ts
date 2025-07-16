import { BrowserWindow, screen } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { VITE_DEV_SERVER_URL } from './main';

let floatingModal: BrowserWindow | null = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function showFloatingModal() {
    const cursor = screen.getCursorScreenPoint();

    if (floatingModal) {
        floatingModal.close();
    }

    floatingModal = new BrowserWindow({
        width: 500,
        height: 300,
        x: cursor.x + 10,
        y: cursor.y + 10,
        frame: true,
        transparent: false,
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: true,
        focusable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            contextIsolation: true,
        },
    });

    floatingModal.loadURL(`${VITE_DEV_SERVER_URL}#/translate-modal`);
}
