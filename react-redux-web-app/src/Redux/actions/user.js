import axios from 'axios';
import types from '../types';


export const getUserProfile = (email) => (dispatch) => {
        axios.get(`/user/${email}`).then((res)=>{
            let profile = res.data
            console.log(profile)
            dispatch({type: types.SET_PROFILE, payload: profile})
        }).catch(err=>console.log(err))
    }
