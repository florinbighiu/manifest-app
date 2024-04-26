import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './layout/root-layout'
import DashboardLayout from './layout/dashboard-layout'
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TodayTasks from './pages/TodayTasks';
import { UpcomingTasks } from './pages/UpcomingTasks';
import { ImportantTasks } from './pages/ImportantTasks';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "",
        children: [
          { path: "/todos", element: <TodayTasks /> },
          { path: "/upcoming", element: <UpcomingTasks /> },
          { path: "/important", element: <ImportantTasks /> },

        ]
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
