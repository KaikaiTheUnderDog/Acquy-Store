import axios from 'axios';

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILED,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAILED,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILED,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILED,
  BEST_SELLERS_REQUEST,
  BEST_SELLERS_SUCCESS,
  BEST_SELLERS_FAILED,
  CHECK_IS_BUY_REQUEST,
  CHECK_IS_BUY_SUCCESS,
  CHECK_IS_BUY_FAILED,
} from '../constants/productConstants';
import { apiURL } from '../apiURL';

export const getProducts =
  (keywords, currentPage = 1, price, category, ratings) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCTS_REQUEST,
      });

      let link = `${apiURL}/products?keywords=${keywords}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${apiURL}/products?keywords=${keywords}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCTS_FAILED,
        payload: err.response.data.errMessage,
      });
    }
  };

export const getBestSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: BEST_SELLERS_REQUEST,
    });

    const { data } = await axios.get(`${apiURL}/products/bestsellers`);

    dispatch({
      type: BEST_SELLERS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BEST_SELLERS_FAILED,
      payload: err.response.data.errMessage,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${apiURL}/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload: err.response.data.errMessage,
    });
  }
};

export const checkIsBuy = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_IS_BUY_REQUEST });

    const { data } = await axios.get(`${apiURL}/${id}/isbuy`);

    dispatch({ type: CHECK_IS_BUY_SUCCESS, payload: data.isBuy });
  } catch (err) {
    dispatch({
      type: CHECK_IS_BUY_FAILED,
      payload: err.response.data.errMessage,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`${apiURL}/review`, reviewData, config);
    console.log(data);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAILED,
      payload: error.response.data.errMessage,
    });
  }
};

export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/admin/reviews?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAILED,
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
