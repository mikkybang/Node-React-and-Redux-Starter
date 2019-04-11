import types from '../types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
    profile: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case types.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default: 
            return state;
    }
}