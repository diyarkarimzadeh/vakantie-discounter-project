import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';
import paths from './paths';
import App from '../App';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
