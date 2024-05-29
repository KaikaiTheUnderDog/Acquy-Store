import {
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAILED,
} from '../constants/productConstants';

// eslint-disable-next-line default-param-last
export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case PRODUCT_DETAILS_FAILED:
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
