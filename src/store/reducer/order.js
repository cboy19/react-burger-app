import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const purchaseBurgerStart = (state, action) => {
    return{
        ...state,
        loading: true
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT:return purchaseInit(state, action);    
        case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state, action);  
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData,{id: action.orderId});
            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state;        
    }
};

export default reducer;