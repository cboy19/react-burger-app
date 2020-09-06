import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    orders: [],
    loading: true
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_ORDERS_START:
            return updateObject(state, {loading: true});
        case actionTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            } 
        case actionTypes.GET_ORDERS_FAIL:
            return updateObject(state, {loading: false});                    
        default:
            return state  
        }

 };

 export default reducer;