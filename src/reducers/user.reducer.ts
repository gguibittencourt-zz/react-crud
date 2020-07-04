import {UsersActionTypes} from "../actions/user.action";

export interface User {
    id: string;
    name: String;
    dateOfBirth: Date | null;
    active: boolean;
}

export interface UsersState {
    id: string;
    name: String;
    dateOfBirth: Date | null;
    active: boolean;
    items: User[];
    loading: boolean;
    error: String | null
}

const initialState: UsersState = {
    items: [],
    id: '', dateOfBirth: new Date(), name: '', active: true,
    loading: false,
    error: null
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS:
        case UsersActionTypes.ADD_USER:
        case UsersActionTypes.DELETE_USER:
            return {...state, loading: true};
        case UsersActionTypes.FETCH_USERS_SUCCESS:
        case UsersActionTypes.ADD_USER_SUCCESS:
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                items: [].concat(action.payload)
            };
        case UsersActionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                items: state.items.filter(value => value.id !== action.id)
            };
        case UsersActionTypes.FETCH_USERS_FAIL:
        case UsersActionTypes.ADD_USER_FAIL:
            return {...state, loading: false};
        case UsersActionTypes.HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state;
    }
}