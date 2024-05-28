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
