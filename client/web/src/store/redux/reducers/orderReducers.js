import {
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILED,
	CLEAR_ERRORS,
} from '../constants/orderConstants';

// eslint-disable-next-line default-param-last
const orderDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case ORDER_DETAILS_FAILED:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default orderDetailsReducer;
