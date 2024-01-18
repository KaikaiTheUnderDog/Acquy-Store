import axios from 'axios'

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
    UPDATE_FLASHSALE_SUCCESS,
    UPDATE_FLASHSALE_REQUEST,
    UPDATE_FLASHSALE_FAIL,
    DELETE_FLASHSALE_REQUEST,
    DELETE_FLASHSALE_SUCCESS,
    DELETE_FLASHSALE_FAIL,
    FLASHSALE_DETAILS_REQUEST,
    FLASHSALE_DETAILS_SUCCESS,
    FLASHSALE_DETAILS_FAIL,
    CLEAR_ERROR
} from '../constants/flashsaleConstant'

export const createFlashsale = (flashsale) => async (dispatch, getState) => { // changed from 'order' to 'flashsale'
    try {

        dispatch({ type: CREATE_FLASHSALE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/newflashsale', flashsale, config) // changed the API endpoint

        dispatch({
            type: CREATE_FLASHSALE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_FLASHSALE_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get all flash sales - ADMIN
export const allFlashsales = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_FLASHSALES_REQUEST });

        const { data } = await axios.get(`/api/v1/flashsales`)

        dispatch({
            type: ALL_FLASHSALES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_FLASHSALES_FAIL,
            payload: error.response.data.message
        })
    }
}


// update order
export const updateFlashsale = (id, orderStatus) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_FLASHSALE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderStatus, config)

        dispatch({
            type: UPDATE_FLASHSALE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_FLASHSALE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete order
export const deleteFlashsale = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_FLASHSALE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_FLASHSALE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_FLASHSALE_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}