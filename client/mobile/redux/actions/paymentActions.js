import axios from 'axios';
import {
  GET_STRIPE_APIKEY_FAILED,
  GET_STRIPE_APIKEY_REQUEST,
  GET_STRIPE_APIKEY_SUCCESS,
  PROCESS_PAYMENT_FAILED,
  PROCESS_PAYMENT_REQUEST,
  PROCESS_PAYMENT_SUCCESS,
} from '../constants/paymentConstants';
import { apiURL } from '../apiURL';

export const getStripeAPIKey = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_STRIPE_APIKEY_REQUEST,
    });

    const { data } = await axios.get(`${apiURL}/stripeapi`);

    dispatch({
      type: GET_STRIPE_APIKEY_SUCCESS,
      payload: data.stripeAPIKey,
    });
  } catch (error) {
    dispatch({
      type: GET_STRIPE_APIKEY_FAILED,
      payload: err.response.data.errMessage,
    });
  }
};

export const processPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: PROCESS_PAYMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${apiURL}/payment/process`,
      paymentData,
      config
    );

    dispatch({ type: PROCESS_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROCESS_PAYMENT_FAILED,
      payload: err.response.data.errMessage,
    });
  }
};
