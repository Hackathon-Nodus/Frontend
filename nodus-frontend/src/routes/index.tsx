import { createBrowserRouter } from 'react-router-dom';
import SignUp from '../features/auth/pages/signUp';
import SignIn from '../features/auth/pages/signIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
]);