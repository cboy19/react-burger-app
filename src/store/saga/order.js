import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try{
    const response = yield  axios.post('https://react-my-burger-884f9.firebaseio.com/orders.json?auth=' + action.token , action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
        }
   catch(error){
    yield put(actions.purchaseBurgerFail(error));
    }    
}