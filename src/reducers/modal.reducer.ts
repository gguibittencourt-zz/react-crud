import {ModalActionsType} from "../actions/modal.action";

export interface ModalState {
    open: boolean;
    id: string;
    title: string;
    message: string;
}

const initialState: ModalState = {
    open: false,
    id: '',
    title: '',
    message: '',
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ModalActionsType.SHOW:
            return {
                ...state,
                open: true,
                id: action.props.id,
                title: action.props.title,
                message: action.props.message,
            };
        default:
            return initialState;
    }
}