import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';

// Create router with future flags for v7 behavior
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;