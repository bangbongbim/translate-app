import '@/styles/global.css';
import { useGlobalMousePosition } from './hooks/useGlobalMousePosition';

function App() {
    const { x, y } = useGlobalMousePosition();

    return (
        <>
            <div className="flex flex-col bg-amber-200">
                <p className="p-1">x : {x}</p>
                <p>y : {y}</p>
            </div>
        </>
    );
}

export default App;
