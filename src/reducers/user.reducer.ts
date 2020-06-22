import {UsersActionTypes} from "../actions/user.actions";

export interface User {
    id: string;
    name: string | null;
    dateOfBirth: Date | null;
    active: boolean;
}

export interface UsersState {
    id: string;
    name: string | null;
    dateOfBirth: Date | null;
    active: boolean;
    items: User[];
    loading: boolean;
    error: String | null
}

const initialState: UsersState = {
    items: [],
    id: '', dateOfBirth: null, name: '', active: true,
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS:
        case UsersActionTypes.ADD_USER:
            return {...state, loading: true};
        case UsersActionTypes.FETCH_USERS_SUCCESS:
        case UsersActionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                items: [].concat(action.payload)
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