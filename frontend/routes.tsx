import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SignupView from './views/signup/SignupView';
import LoginView from './views/login/LoginView';
import ShopView from './views/shop/ShopView';
import CartView from './views/cart/CartView';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <LoginView />,
      },
      {
        path: '/signup',
        element: <SignupView />,
      },
      {
        path: '/shop',
        element: <ShopView />,
      },
      {
        path: '/cart',
        element: <CartView />,
      },
    ],
  },
]);

export default router;
