import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const getOrderSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders: orders
    }
}

export const getOrderFail = (error) => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        error: error
    }
}

export const getOrderStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START
    }
}


export const getOrders = (token, userId) => {
    return dispatch => {
        dispatch(getOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="user"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then((res) => {
            const fetchedOrders = [];
            for(let key in res.data){
               fetchedOrders.push({
                   ...res.data[key],
                   id: key
                                   });
            }
           dispatch(getOrderSuccess(fetchedOrders));
        })
        .catch(error => {
           dispatch(getOrderFail(error));
        });
    }
}
