
import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expdate');
    yield localStorage.removeItem('user');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.exparationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.pswd,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBccjxpB6v6gFoXdE8U-XqOoAjcDZI5kz0';
    if (!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBccjxpB6v6gFoXdE8U-XqOoAjcDZI5kz0';
    }
    try {
    const response = yield axios.post(url,authData)
    const expdate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
    localStorage.setItem('token', response.data.idToken); // since these are sync functions we dont need to add yield
    localStorage.setItem('expdate', expdate);
    localStorage.setItem('user', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch(err){
        yield put(actions.authFail(err.response.data.error));
    }

}

export function* authCheckStateSaga(action){
    const token = localStorage.getItem('token');
    if (!token){
        yield put(actions.logout());
    }
    else {
    const expdate = new Date(localStorage.getItem('expdate'));
    if (expdate > new Date()){
        const user = localStorage.getItem('user');
        yield put(actions.authSuccess(token, user));
        yield put(actions.checkAuthTimeout((expdate.getTime() - new Date().getTime()) / 1000 ));
    }
    else {
        yield put(actions.logout());
    }
   
         }
}