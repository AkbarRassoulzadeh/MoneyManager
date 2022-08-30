import React from 'react';
import Home from './components/Home';
import Add from './components/Add';
import Delete from './components/Delete';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/delete/:id',
    element: <Delete />,
  },
  {
    path: '/edit/:id',
    element: <Add />,
  },
];

export default AppRoutes;
