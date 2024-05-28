import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import themeReducer from '../theme';
import { thunk } from 'redux-thunk';

/* import {
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  updateProductReducer,
  reviewReducer,
  productReviewsReducer,
  bestSellersReducer,
  checkIsBuyReducer,
} from './reducers/productReducers'; */
import {
	authReducer,
	/* userReducer,
  allUsersReducer,
  userDetailsReducer, */
} from './reducers/userReducers';
import { dashboardReducer, allOrdersReducer, orderReducer, productReducer } from './reducers/adminReducers';
import orderDetailsReducer from './reducers/orderReducers';

const reducer = combineReducers({
	/* 
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  myOrders: myOrdersReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
  bestSellers: bestSellersReducer,
  checkIsBuy: checkIsBuyReducer, */
	auth: authReducer,
	dashboard: dashboardReducer,
	allOrders: allOrdersReducer,
	order: orderReducer,
	orderDetails: orderDetailsReducer,
	products: productReducer,
	theme: themeReducer,
});

const store = configureStore({
	devTools: process.env.NODE_ENV !== 'production',
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
