import { getUserDetails } from './services/user.service';
import { combineReducers } from 'redux';
const userDetails = (state: any = {userDetails:getUserDetails()}, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            state.userDetails = action.userDetails;
            return state.userDetails;
        default:
            return state.userDetails;

    }
}


export const reducer = combineReducers({ userDetails });