import App from '@/App';
import TranslateModal from '@/components/modals/TranslateModal';
import { createHashRouter, Outlet } from 'react-router-dom';

export const router = createHashRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: '/translate-modal',
                element: <TranslateModal />,
            },
        ],
    },
]);
