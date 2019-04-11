import axios from 'axios';
import types from '../types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const registerUser = (user, history) => dispatch => {
    axios.post('/user/register', user)
            .then(res =>{
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                console.log(res.data);})
            .catch(err => {
                console.log(err.response.data)
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/user/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                console.log(res.data);
            })
            .catch(err => {
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}