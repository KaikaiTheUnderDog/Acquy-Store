import {
    CREATE_FLASHSALE_REQUEST,
    CREATE_FLASHSALE_SUCCESS,
    CREATE_FLASHSALE_FAIL,
    MY_FLASHSALES_REQUEST,
    MY_FLASHSALES_SUCCESS,
    MY_FLASHSALES_FAIL,
    ALL_FLASHSALES_REQUEST,
    ALL_FLASHSALES_SUCCESS,
    ALL_FLASHSALES_FAIL,
    UPDATE_FLASHSALE_REQUEST,
    UPDATE_FLASHSALE_SUCCESS,
    UPDATE_FLASHSALE_RESET,
    UPDATE_FLASHSALE_FAIL,
    DELETE_FLASHSALE_REQUEST,
    DELETE_FLASHSALE_SUCCESS,
    DELETE_FLASHSALE_RESET,
    DELETE_FLASHSALE_FAIL,
    FLASHSALE_DETAILS_REQUEST,
    FLASHSALE_DETAILS_SUCCESS,
    FLASHSALE_DETAILS_FAIL,
    CLEAR_ERROR
} from '../constants/flashsaleConstant'

export const newFlashsaleReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_FLASHSALE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_FLASHSALE_SUCCESS:
            return {
                loading: false,
                flashsale: action.payload // changed from 'order' to 'flashsale'
            }

        case CREATE_FLASHSALE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const FlashsalesReducer = (state = { flashsales: [] }, action) => {
    switch (action.type) {

        case MY_FLASHSALES_REQUEST:
            return {
                loading: true
            }

        case MY_FLASHSALES_SUCCESS:
            return {
                loading: false,
                flashsales: action.payload
            }

        case MY_FLASHSALES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const flashsaleDetailReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case FLASHSALE_DETAILS_REQUEST:
            return {
                loading: true
            }

        case FLASHSALE_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case FLASHSALE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allFlashsalesReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case ALL_FLASHSALES_REQUEST:
            return {
                loading: true
            }

        case ALL_FLASHSALES_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }

        case ALL_FLASHSALES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_FLASHSALE_REQUEST:
        case DELETE_FLASHSALE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_FLASHSALE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_FLASHSALE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_FLASHSALE_FAIL:
        case DELETE_FLASHSALE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case UPDATE_FLASHSALE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_FLASHSALE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}