import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {closeModal} from "../actions/modal.action";
import {deleteUser} from "../actions/user.action";

export interface ModalProps {
    open: boolean;
    id: string;
    title: string;
    message: string;
    closeModal: () => any;
    confirmModal: (id: string) => any;
}

const Modal = (props: ModalProps) => {
    return (
        <div>
            <Dialog open={props.open} onClose={props.closeModal}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={() => props.confirmModal(props.id)} color="primary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    open: state.modalReducer.open,
    id: state.modalReducer.id,
    title: state.modalReducer.title,
    message: state.modalReducer.message,
});

const mapDispatchToProps = (dispatch: any) => ({
    closeModal: () => dispatch(closeModal()),
    confirmModal: (id: string) => dispatch(deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);