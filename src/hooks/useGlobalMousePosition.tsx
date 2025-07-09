import { useEffect, useState } from 'react';

export const useGlobalMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // 🔔 preload에서 보낸 메시지 수신
        window.electronAPI?.onToggleModal((pos) => {
            setPosition({
                x: pos.x,
                y: pos.y,
            });
        });
    }, []);

    return position;
};
