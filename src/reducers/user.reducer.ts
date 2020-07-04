import {UsersActionTypes} from "../actions/user.action";

export interface User {
    id: string;
    name: String;
    dateOfBirth: Date;
    active: boolean;
}

export interface UsersState {
    id: string;
    name: String;
    dateOfBirth: Date;
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
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                items: [].concat(action.payload)
            };
        case UsersActionTypes.DELETE_USER:
            return {
                ...state,
                items: state.items.filter(value => value.id !== action.id)
            };
        case UsersActionTypes.HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state;
    }
}