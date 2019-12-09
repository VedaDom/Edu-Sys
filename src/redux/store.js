import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const middleware = [];

const store = createStore(rootReducer, applyMiddleware(...middleware)); // , initialState, applyMiddleware(...middleware)

export default store;