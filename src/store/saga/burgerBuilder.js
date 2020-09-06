import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* initIngredientsSaga(action){
    try{
    const response = yield axios.get('https://react-my-burger-884f9.firebaseio.com/Ingredients.json');
    yield put(actions.setIngredients(response.data));
    }
    catch(error){
    yield put(actions.fetchIngredientsFailed);
    }

}