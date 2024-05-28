import {
	CLEAR_ERRORS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILED,
} from '../constants/orderConstants';

import axios from 'axios';

export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/order/${id}`);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAILED,
			payload: error.response.data.errMessage,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
