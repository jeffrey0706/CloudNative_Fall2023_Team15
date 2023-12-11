import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './ui/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './ui/Page/MainPage';
import GuardMonitor from './ui/Page/GuardMonitor';
import Dashboard from './ui/Page/Dashboard';
import ReservePage from './ui/Page/ReservePage';
import MapView from './ui/Page/MapView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <MainPage />,
  },
  {
    path: "guard/",
    element: <GuardMonitor />,
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
  },
  {
    path: "reservation/",
    element: <ReservePage />,
  },
  {
    path: "map/",
    element: <MapView />,
  },
]);
// TODO: Update all the hyperlinks to <Link> element provided by react-router-dom
// E.g. <a href="/guard/">Guard</a> ==> <Link to="/guard/">Guard</Link>
// S.t. it won't need another request to the server to update the page

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
