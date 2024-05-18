import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Dashboard from './pages/Dashboard';
// import Post from './pages/Post';
// import Shop from './pages/Shop';

// import{
//   createBrowserRouter,
//   RouterProvider,
// }from "react-router-dom";

// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<App/>
//   },
//   {
//     path:"dashboard",
//     element:<Dashboard/>
//   },
//   {
//     path:"post",
//     element:<Post/>
//   },
//   {
//     path:"shop",
//     element:<Shop/>
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <App/>
  </React.StrictMode>
);

reportWebVitals();