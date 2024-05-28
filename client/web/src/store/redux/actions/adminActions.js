import axios from 'axios';

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
	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAILED,
	ADMIN_PRODUCTS_FAILED,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAILED,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILED,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAILED,
	GET_USER_COUNT_REQUEST,
	GET_USER_COUNT_SUCCESS,
	GET_USER_COUNT_FAILED,
} from '../constants/adminConstants';

export const getDashboardData = () => async (dispatch) => {
	try {
		dispatch({ type: GET_DASHBOARD_REQUEST });

		const { data } = await axios.get('/api/v1/admin/dashboard');

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

export const getUserCountData = () => async (dispatch) => {
	try {
		dispatch({ type: GET_USER_COUNT_REQUEST });

		const { data } = await axios.get('/api/v1/admin/users/count');

		dispatch({
			type: GET_USER_COUNT_SUCCESS,
			payload: {
				success: data.success,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: GET_USER_COUNT_FAILED,
			payload: error.response.data.errMessage,
		});
	}
};

export const allOrders = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_ORDERS_REQUEST });

		const { data } = await axios.get('/api/v1/admin/orders');

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

		const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);

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

export const getAdminProducts =
	(price, category, keywords, ratings = 0) =>
	async (dispatch) => {
		try {
			dispatch({ type: ADMIN_PRODUCTS_REQUEST });

			let link = `/api/v1/admin/products?ratings[gte]=${ratings}`;

			if (keywords) {
				link = `/api/v1/admin/products?keywords=${keywords}&ratings[gte]=${ratings}`;
			}

			if (price) {
				link = `/api/v1/admin/products?keywords=${keywords}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`;
			}

			if (category) {
				link = `/api/v1/admin/products?keywords=${keywords}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}`;
			}

			const { data } = await axios.get(link);

			dispatch({
				type: ADMIN_PRODUCTS_SUCCESS,
				payload: {
					products: data.products,
					mostGained: data.mostGained,
				},
			});
		} catch (error) {
			dispatch({
				type: ADMIN_PRODUCTS_FAILED,
				payload: error.response.data.errMessage,
			});
		}
	};

export const newProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PRODUCT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/v1/admin/product/new', productData, config);

		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PRODUCT_FAILED,
			payload: error.response.data.errMessage,
		});
	}
};

export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAILED,
			payload: error.response.data.errMessage,
		});
	}
};

export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAILED,
			payload: error.response.data.errMessage,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: 'CLEAR_ERRORS',
	});
};
