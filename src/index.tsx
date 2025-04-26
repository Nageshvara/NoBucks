import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Provider} from "react-redux"
import {store} from "./redux/store"

import reportWebVitals from './reportWebVitals';

import {createBrowserRouter,RouterProvider} from  'react-router-dom'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/Wishlist';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/product/:id',
    element:<ProductDetails/>
  },
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/checkout',
    element:<Checkout/>
  },
  {
    path:'*',
    element:<NotFound/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/myorders',
    element:<MyOrders/>
  },
  {
    path:'/wishlist',
    element:<Wishlist/>
  },
  {
    path:'/order-success',
    element:<OrderSuccess/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AnimatePresence mode='wait'>
    <RouterProvider router={router}/>
    </AnimatePresence>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
