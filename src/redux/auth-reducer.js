import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';
const SET_CAPTCHA_URL = 'SET-CAPTCHA-URL'


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth,
                /*...action.data*/
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captcha
            }


        default: return state
    }


}

export const setAuthUserData = (id, email, login, isAuth) => {
    return {
        type: SET_AUTH_USER_DATA,
            id,
            email,
            login,
            isAuth
    }
}

export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuthData()
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {

    return async (dispatch) => {

        let data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let errorMessage = data.messages.length > 0 ? data.messages[0] : 'unknown fail';
            dispatch(stopSubmit('loginForm', {_error: errorMessage}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const setCaptchaUrl = (captcha) => {
    return {
        type: SET_CAPTCHA_URL,
        captcha
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(data.url))
    }
}


export default authReducer;