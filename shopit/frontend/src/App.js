import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './components/products/productDetails';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';

import { loadUser } from './actions/userAction';
import store from './store';
import ProtectedRoute from './components/route/ProtectedRoute';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrder from './components/order/ListOrder';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UserList';
import FlashsaleList from './components/admin/FlashsaleList';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');


  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const PaymentWrapper = () => {
    async function getStripeAPIKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeAPIKey();

    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    );
  };


  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" exact element={<ProductDetails />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path='/cart' exact element={<Cart />} />
            <Route path="/password/forgot" exact element={<ForgotPassword />} />
            <Route path="/password/reset/:token" exact element={<NewPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/me' element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path='/orders/me' element={<ListOrder />} />
              <Route path='/order/:id' element={<OrderDetail />} />
              <Route path="/payment" element={<ProtectedRoute />}>
                <Route index element={<PaymentWrapper />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<ProductsList />} />
          <Route path='/admin/product' element={<NewProduct />} />
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
          <Route path='/admin/order/:id' element={<ProcessOrder />} />
          <Route path='/admin/orders' element={<OrdersList />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/flashsales' element={<FlashsaleList/>} />
        </Routes>

        <Footer />
      </div>
    </Router>

  );
}

export default App;
