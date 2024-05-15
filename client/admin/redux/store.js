import { configureStore, combineReducers } from '@reduxjs/toolkit';

/* import {
  productReducer,
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
import {
  dashboardReducer,
  allOrdersReducer,
  orderReducer,
} from './reducers/adminReducers';
import { orderDetailsReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  /* products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  myOrders: myOrdersReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
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
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
