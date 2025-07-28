import { BrowserWindow, screen } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { VITE_DEV_SERVER_URL } from './main';

let floatingModal: BrowserWindow | null = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function showFloatingModal() {
    const cursor = screen.getCursorScreenPoint();

    // 이미 생성된 윈도우가 닫혔거나 파괴(destroyed) 상태면 새로 생성
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
                preload: path.join(__dirname, 'preload.mjs'),
                contextIsolation: true,
            },
        });

        floatingModal.on('closed', () => {
            floatingModal = null;
        });

        floatingModal.loadURL(`${VITE_DEV_SERVER_URL}#/translate-modal`);
    } else {
        // 이미 열려있는 경우 위치만 업데이트하고 띄우기
        floatingModal.setPosition(cursor.x + 10, cursor.y + 10);
        floatingModal.show();
        floatingModal.focus();
    }
}
