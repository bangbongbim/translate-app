import { globalShortcut } from 'electron';

export const registerGlobalShortcuts = (shortcut: string, callback: () => void) => {
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
