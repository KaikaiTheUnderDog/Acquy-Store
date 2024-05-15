import axios from 'axios';

import { apiURL } from '../apiURL';
import {
  GET_DASHBOARD_FAILED,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAILED,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
} from '../constants/adminConstants';

export const getDashboardData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DASHBOARD_REQUEST });

    const { data } = await axios.get(`${apiURL}/admin/dashboard`);

    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: {
        success: data.success,
        data: data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${apiURL}/admin/orders`);

    console.log(data);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${apiURL}/admin/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_ERRORS',
  });
};
