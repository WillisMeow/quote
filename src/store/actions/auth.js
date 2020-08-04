import * as actionTypes from '../actions/actionType';
import axios from 'axios';

//--------------------LOGGING IN--------------------//
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000) // * 1000 to convert from milliseconds to seconds (setTimeout returns milliSeconds)
    }
}
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcprcEU4sDaKk4rAnXGqI60JNTD-HVWaE" // this is url for signup new user
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcprcEU4sDaKk4rAnXGqI60JNTD-HVWaE" // url for signing up with existing user
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            console.log(response.data)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000) // new Date() w/out arguments gives the current date (.getTime*( gets the currenttime as well)). new Date() w/ arguments gives you the calculated date (or the argument)
            console.log(expirationDate)
            localStorage.setItem("token", response.data.idToken); // localStorage is local browser storage
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
            console.log(localStorage)
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            dispatch(authLogout());
            console.log('dispatching authLogout')
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(authLogout())
            }
        }
    }
}