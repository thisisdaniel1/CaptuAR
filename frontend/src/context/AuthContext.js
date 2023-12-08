import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            console.log("meow");
            return { ...state, errorMessage: action.payload };
        case "register":
            return { errorMessage: "", token: action.payload };
        case "login":
            return { errorMessage: "", token: action.payload };
        // case "logout":
        //     return { errorMessage: "", token: null };
        case "clear_error_message":
            return { ...state, errorMessage: "" };
        default:
            return state;
    }
};

const register = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'register', payload: response.data.token});
            navigate('Home');
        } catch (err) {
            console.log("oops..error!");
            dispatch({ type: "add_error", payload: 'Something went wrong with sign up' })
        }
    }
}

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({ type: "clear_error_message" });
    }
}

const login = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'login', payload: response.data.token});
            navigate('CreateServer');
        } catch (err) {
            console.log("oops..error!");
            dispatch({ type: "add_error", payload: 'Something went wrong with sign in' })
        }
    }
}

const tryLocalLogin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({type: 'login', payload: token});
            navigate('CreateServer');
        } else {
            navigate('Login');
        }
    }
}

const logout = (dispatch) => {
    return () => {

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { register, login, logout, clearErrorMessage, tryLocalLogin },
    { token: null, errorMessage: '' }
)