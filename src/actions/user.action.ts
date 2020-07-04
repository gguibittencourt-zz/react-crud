import {Dispatch} from 'redux';
import {get, post, remove} from "../services/user.service";
import {User} from "../reducers/user.reducer";
import {closeModal} from "./modal.action";

export enum UsersActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAIL = 'FETCH_USERS_FAIL',
    ADD_USER = 'ADD_USER',
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_FAIL = 'ADD_USER_FAIL',
    DELETE_USER = 'DELETE_USER',
    DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
    HANDLE_ON_CHANGE = 'HANDLE_ON_CHANGE'
}

export const handleFetchUsers = (dispatch: Dispatch) => {
    dispatch({type: UsersActionTypes.FETCH_USERS});
};

const handleFetchUsersSuccess = (dispatch: Dispatch, response: User[]) => {
    dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: response
    });
};

const handleFetchUsersFail = (dispatch: Dispatch) => {
    dispatch({
        type: UsersActionTypes.FETCH_USERS_FAIL
    });
};

export const fetchUsers = (): any => {
    return (dispatch: Dispatch) => {
        handleFetchUsers(dispatch);

        return get('/users').then(
            response => handleFetchUsersSuccess(dispatch, response.data),
            err => handleFetchUsersFail(dispatch)
        );
    }
};

export const handleAddUsers = (dispatch: Dispatch) => {
    dispatch({type: UsersActionTypes.ADD_USER});
};

const handleAddUsersSuccess = (dispatch: Dispatch, response: User[]) => {
    dispatch({
        type: UsersActionTypes.ADD_USER_SUCCESS,
        payload: response
    });
};

const handleAddUsersFail = (dispatch: Dispatch) => {
    dispatch({
        type: UsersActionTypes.ADD_USER_FAIL
    });
};

export const addUser = (user: User): any => {
    return (dispatch: Dispatch) => {
        handleAddUsers(dispatch);

        return post('/users', user).then(
            response => handleAddUsersSuccess(dispatch, response.data),
            err => handleAddUsersFail(dispatch)
        );
    }
};

const handleOnChangeProps = (props: string, value: any) => {
    return {
        type: UsersActionTypes.HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
};

export const onChangeProps = (props: any, value: any): any => {
    return (dispatch: Dispatch) => {
        dispatch(handleOnChangeProps(props, value));
    }
}

const handleDeleteUsersSuccess = (dispatch: Dispatch, id: string) => {
    dispatch({
        type: UsersActionTypes.DELETE_USER_SUCCESS,
        id
    });
};

export const handleDeleteUsers = (dispatch: Dispatch) => {
    dispatch({type: UsersActionTypes.DELETE_USER});
};

export const deleteUser = (id: string): any => {
    return (dispatch: Dispatch) => {
        handleDeleteUsers(dispatch);

        return remove(`/users/${id}`).then(() => {
            handleDeleteUsersSuccess(dispatch, id);
            dispatch(closeModal());
        });
    }
};