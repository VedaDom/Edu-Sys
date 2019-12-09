import { ADD_USER, SET_CURRENT_USER } from '../actions/types';

const initialState = {
    users: [],
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

