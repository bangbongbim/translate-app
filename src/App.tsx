import './App.css';
import { Button } from './components/ui/button';
import { useEffect, useState } from 'react';
import { useGlobalMousePosition } from './hooks/useGlobalMousePosition';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    const { x, y } = useGlobalMousePosition();

    useEffect(() => {
        window.electronAPI?.onToggleModal(() => {
            setModalOpen(true);
        });
    }, []);

    return (
        <>
            <Button variant="outline" className="font-black">
                gaaaag
            </Button>
            <div className="flex flex-col bg-amber-200">
                <p>{x}</p>
                <p>{y}</p>
                {isModalOpen && <p>123123</p>}
            </div>
            {isModalOpen && (
                <div
                    className="fixed bg-white border shadow-lg rounded p-4 text-black"
                    style={{
                        top: y + 10, // 커서 바로 아래
                        left: x,
                        zIndex: 9999,
                    }}
                >
                    📝 번역 모달입니다!
                </div>
            )}{' '}
        </>
    );
}

export default App;
