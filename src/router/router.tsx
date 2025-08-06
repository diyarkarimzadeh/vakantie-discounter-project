import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';
import paths from './paths';
import App from '../App';
import Scores from '../pages/scores';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: paths.scores, element: <Scores /> },
    ],
  },
]);

export default router;
