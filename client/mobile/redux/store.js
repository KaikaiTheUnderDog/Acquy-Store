import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  updateProductReducer,
  reviewReducer,
  productReviewsReducer,
  bestSellersReducer,
} from './reducers/productReducers';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from './reducers/orderReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  bestSellers: bestSellersReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
});

const store = configureStore({
  reducer: reducer,
  preloadedState: {
    cart: {
      cartItems: [],
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Asynchronously load cart items and update the store
const loadCartItems = async () => {
  try {
    const cartItemsString = await AsyncStorage.getItem('cartItems');
    if (cartItemsString && cartItemsString !== '[]') {
      const cartItems = JSON.parse(cartItemsString);
      // Dispatch an action to update the cart items in the store
      // You need to have an action in your cart reducer to handle this
      store.dispatch({
        type: 'cart/setCartItems',
        payload: cartItems,
      });
    }
  } catch (error) {
    console.error('Error loading cart items:', error);
  }
};

// Call the function to load the cart items
loadCartItems();

export default store;
