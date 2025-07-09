import App from '@/App';
import TranslateModal from '@/components/modals/TranslateModal';
import { createHashRouter, Outlet } from 'react-router-dom';

export const router = createHashRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                index: true, // 기본 경로
                element: <App />, // "/" → App 렌더링
            },
            {
                path: '/translate-modal',
                element: <TranslateModal />,
            },
        ],
    },
]);
