import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SignupView from './views/signup/SignupView';

const LoginView = lazy(async () => import('Frontend/views/login/LoginView.js'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginView />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupView />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
