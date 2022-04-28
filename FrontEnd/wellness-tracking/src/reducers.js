import { getUserDetails } from './services/user.service';
import { combineReducers } from 'redux';
const userDetails = (state  = {userDetails:getUserDetails()}, action ) => {
    switch (action.type) {
        case 'SET_USER':
            state.userDetails = action.userDetails;
            return state.userDetails;
        default:
            return state.userDetails;

    }
}




export const reducer = combineReducers({ userDetails });