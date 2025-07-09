/// <reference types="vite/client" />
export {};

declare global {
    interface Window {
        electronAPI?: {
            onToggleModal: (callback: (pos: { x: number; y: number }) => void) => void;
        };
    }
}
