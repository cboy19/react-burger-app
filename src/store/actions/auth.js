import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
/*     localStorage.removeItem('token');
    localStorage.removeItem('expdate');
    localStorage.removeItem('user'); 
    return{
        type: actionTypes.AUTH_LOGOUT
    };

*/
return{
    type: actionTypes.AUTH_INITIATE_LOGOUT
};


};

export const logoutSucceed = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};


export const checkAuthTimeout = (exparationTime) => {
/*     return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, exparationTime * 1000);
    }; */
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        exparationTime: exparationTime

    };
};

export const auth = (email, pswd, isSignup) => {
/*     return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: pswd,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBccjxpB6v6gFoXdE8U-XqOoAjcDZI5kz0';
        if (!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBccjxpB6v6gFoXdE8U-XqOoAjcDZI5kz0';
        }
        axios.post(url,authData)
             .then(response => {
                console.log(response);
                const expdate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expdate', expdate);
                localStorage.setItem('user', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFail(err.response.data.error));
             })
    }; */

    return {
        type: actionTypes.AUTH_USER,
        email: email,
        pswd:pswd,
        isSignup:isSignup

    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    };
};

export const authCheckState = () => {
/*     return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }
        else {
        const expdate = new Date(localStorage.getItem('expdate'));
        if (expdate > new Date()){
            const user = localStorage.getItem('user');
            dispatch(authSuccess(token, user));
            dispatch(checkAuthTimeout((expdate.getTime() - new Date().getTime()) / 1000 ));
        }
        else {
            dispatch(logout());
        }
       
             }
    }; */

    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};