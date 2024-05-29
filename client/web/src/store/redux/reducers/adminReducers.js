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
	UPDATE_ORDER_RESET,
	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAILED,
	DELETE_ORDER_RESET,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_FAILED,
	ADMIN_PRODUCTS_SUCCESS,
	GET_USER_COUNT_REQUEST,
	GET_USER_COUNT_FAILED,
	GET_USER_COUNT_SUCCESS,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAILED,
	NEW_PRODUCT_RESET,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAILED,
	UPDATE_PRODUCT_RESET,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILED,
	DELETE_PRODUCT_RESET,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAILED,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILED,
	DELETE_REVIEW_RESET,
} from '../constants/adminConstants';

// eslint-disable-next-line default-param-last
export const dashboardReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_DASHBOARD_REQUEST:
		case GET_USER_COUNT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_DASHBOARD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				dashboardData: action.payload.data,
			};

		case GET_USER_COUNT_SUCCESS:
			return {
				...state,
				loading: false,
				userCountData: action.payload.data,
			};

		case GET_DASHBOARD_FAILED:
		case GET_USER_COUNT_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
export const allOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ALL_ORDERS_REQUEST:
			return {
				loading: true,
			};

		case ALL_ORDERS_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
				totalAmount: action.payload.totalAmount,
			};

		case ALL_ORDERS_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
export const orderReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_ORDER_REQUEST:
		case DELETE_ORDER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case UPDATE_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_ORDER_FAILED:
		case DELETE_ORDER_FAILED:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_ORDER_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case DELETE_ORDER_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
export const productReducer = (state = { products: [], mostGained: [] }, action) => {
	switch (action.type) {
		case ADMIN_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: [],
				mostGained: [],
			};

		case ADMIN_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				mostGained: action.payload.mostGained,
			};
		case ADMIN_PRODUCTS_FAILED:
			return {
				loading: false,
				error: action.payload,
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
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

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
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

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
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

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// eslint-disable-next-line default-param-last
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

		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
