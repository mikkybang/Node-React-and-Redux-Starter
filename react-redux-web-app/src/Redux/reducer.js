import { combineReducers } from 'redux';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import storeReducer from './reducers/storeReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    user: userReducer,
});