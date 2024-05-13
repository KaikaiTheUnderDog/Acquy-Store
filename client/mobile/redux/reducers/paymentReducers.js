import {
  GET_STRIPE_APIKEY_FAILED,
  GET_STRIPE_APIKEY_REQUEST,
  GET_STRIPE_APIKEY_SUCCESS,
  PROCESS_PAYMENT_FAILED,
  PROCESS_PAYMENT_REQUEST,
  PROCESS_PAYMENT_RESET,
  PROCESS_PAYMENT_SUCCESS,
} from '../constants/paymentConstants';

export const stripeAPIKeyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STRIPE_APIKEY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STRIPE_APIKEY_SUCCESS:
      return {
        ...state,
        loading: false,
        stripeAPIKey: action.payload,
      };
    case GET_STRIPE_APIKEY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const processPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PROCESS_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        clientSecret: action.payload.client_secret,
      };
    case PROCESS_PAYMENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case PROCESS_PAYMENT_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};
