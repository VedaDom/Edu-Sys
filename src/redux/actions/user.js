import { ADD_USER } from './types';

export const addUser = (user) => dispatch => {
    dispatch({
        type: ADD_USER,
        payload: user
    });
}