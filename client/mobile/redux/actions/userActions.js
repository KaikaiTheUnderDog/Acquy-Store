import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  NEW_PASSWORD_FAILED,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_REQUEST,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  ADD_SHIPPING_INFO_REQUEST,
  ADD_SHIPPING_INFO_FAILED,
  ADD_SHIPPING_INFO_SUCCESS,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILED,
  VERIFY_FAILED,
  VERIFY_SUCCESS,
  VERIFY_REQUEST,
  RESET_PASSWORD_VERIFY_REQUEST,
  RESET_PASSWORD_VERIFY_SUCCESS,
  RESET_PASSWORD_VERIFY_FAILED,
} from '../constants/userConstants';
import { apiURL } from '../apiURL';

export const login = (email, password, fcmToken) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `${apiURL}/login`,
      { email, password, fcmToken },
      config
    );

    await AsyncStorage.setItem('token', data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.errMessage || 'error',
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(`${apiURL}/register`, userData, config);

    await AsyncStorage.setItem('token', data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const sendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(`${apiURL}/register/otp`, email, config);

    dispatch({ type: SEND_OTP_SUCCESS, payload: data.mailSent });
  } catch (error) {
    dispatch({
      type: SEND_OTP_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const verifyEmail = (otp) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST });

    const { data } = await axios.put(`${apiURL}/verify/${otp}`);

    dispatch({ type: VERIFY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: VERIFY_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const addShippingInfo = (shippingData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SHIPPING_INFO_REQUEST });

    console.log('called ' + shippingData);

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `${apiURL}/shipping/add`,
      shippingData,
      config
    );

    dispatch({ type: ADD_SHIPPING_INFO_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADD_SHIPPING_INFO_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const { data } = await axios.get(`${apiURL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${apiURL}/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
    });

    AsyncStorage.setItem('token', '');
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(`${apiURL}/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${apiURL}/password/update`,
      password,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const emailData = { email };

    const { data } = await axios.post(
      `${apiURL}/password/forgot`,
      emailData,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.mailSent,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const verifyResetPasswordOtp = (otp) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_VERIFY_REQUEST });

    const { data } = await axios.put(`${apiURL}/password/reset/${otp}`);

    dispatch({ type: RESET_PASSWORD_VERIFY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_VERIFY_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const resetPassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${apiURL}/password/reset`,
      password,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get('/api/v1/admin/users');

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

// Clear error messages
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
