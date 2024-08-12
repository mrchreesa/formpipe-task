import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { UsersPage } from './pages/Users.page';
import UserInfoComponent from './components/UserInfoComponent';

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
    element: <p>Not yet implemented</p>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
