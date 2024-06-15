import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILED,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAILED,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_FAILED,
  ADMIN_PRODUCTS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILED,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILED,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAILED,
  BEST_SELLERS_REQUEST,
  BEST_SELLERS_FAILED,
  BEST_SELLERS_SUCCESS,
  CHECK_IS_BUY_REQUEST,
  CHECK_IS_BUY_SUCCESS,
  CHECK_IS_BUY_FAILED,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_RESET,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILED,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILED,
  REMOVE_FAVORITE_RESET,
} from '../constants/productConstants';

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCTS_REQUEST:
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProduct: action.payload.totalProduct,
        resPerPage: action.payload.resPerPage,
        productsFounded: action.payload.productsFounded,
        bestSellers: action.payload.bestSellers,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ADMIN_PRODUCTS_FAILED:
    case ALL_PRODUCTS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bestSellersReducer = (state = { bestSellers: [] }, action) => {
  switch (action.type) {
    case BEST_SELLERS_REQUEST:
      return {
        loading: true,
      };
    case BEST_SELLERS_SUCCESS:
      return {
        loading: false,
        bestSellers: action.payload.bestSellers,
      };
    case BEST_SELLERS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
    case ADD_FAVORITE_REQUEST:
    case REMOVE_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_FAVORITE_SUCCESS:
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case REMOVE_FAVORITE_FAILED:
    case ADD_FAVORITE_FAILED:
    case PRODUCT_DETAILS_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_FAVORITE_RESET:
    case REMOVE_FAVORITE_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT_FAILED:
    case UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVIEWS_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const checkIsBuyReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_IS_BUY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_IS_BUY_SUCCESS:
      return {
        ...state,
        loading: false,
        isBuy: action.payload,
      };
    case CHECK_IS_BUY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
