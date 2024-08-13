import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { UsersPage } from './pages/Users.page';
import UserInfoComponent from './components/User/UserInfoComponent';
import EditUserComponent from './components/User/EditUserComponent';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/users',
    element: <UsersPage />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/users/view/:id',
    element: <UserInfoComponent />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/users/edit/:id',
    element: <EditUserComponent />,
    errorElement: <ErrorPage />, 
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
