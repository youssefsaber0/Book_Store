import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AddBook from './views/add_book/AddBook';
import DownloadReport from './views/download_report/download_report';
import EditBooks from './views/edit_books/EditBooks';
import OrderView from './views/order/Order';
import Promote from './views/promote/Promote';
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
      {
        path: '/addBook',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddBook />
          </Suspense>
        ),
      },
      {
        path: '/order',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OrderView />
          </Suspense>
        ),
      },
      {
        path: '/promote',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Promote />
          </Suspense>
        ),
      },
      {
        path: '/editBook',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditBooks />
          </Suspense>
        ),
      },
      {
        path: '/DownloadReport',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DownloadReport />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
