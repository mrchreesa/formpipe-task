import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { UsersPage } from './pages/Users.page';
import UserInfoComponent from './components/User/UserInfoComponent';
import EditUserComponent from './components/User/EditUserComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/users/view/:id',
    element: <UserInfoComponent />,
  },
  {
    path: '/users/edit/:id',
    element: <EditUserComponent />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
