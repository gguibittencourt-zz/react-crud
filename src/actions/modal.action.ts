import {Dispatch} from 'redux';

export enum ModalActionsType {
    SHOW = 'SHOW',
    HIDE = 'HIDE',
}

export const openModal = (props: any): any => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ModalActionsType.SHOW,
            props,
        });
    }
};

export const closeModal = (): any => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ModalActionsType.HIDE,
        });
    }
};