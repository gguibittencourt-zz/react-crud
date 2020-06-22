import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import {userReducer} from "./reducers/user.reducer";

export const store = createStore(
    userReducer,
    applyMiddleware(thunk)
);