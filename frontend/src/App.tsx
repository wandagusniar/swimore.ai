import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import OceanBubbles from './components/layout/OceanBubbles';

export const App: React.FC = () => {
  return (
    <>
      <OceanBubbles />
      <RouterProvider router={router} />
    </>
  );
};

export default App;