import {combineReducers} from 'redux'
import userReducer from './user.reducer'
import modalReducer from './modal.reducer'

const rootReducer = combineReducers({
    userReducer,
    modalReducer
});

export default rootReducer;