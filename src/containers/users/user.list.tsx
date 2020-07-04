import React, {Component} from 'react';
import {connect} from 'react-redux';
import {User} from "../../reducers/user.reducer";
import {fetchUsers} from "../../actions/user.action";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from "../../components/modal";
import {openModal} from "../../actions/modal.action";
import { format } from "date-fns";

export interface UserListProps {
    users: User[];
    fetchUsers: () => any;
    openModal: (props: any) => any;
}

class UserList extends Component<UserListProps> {
    componentDidMount(): void {
        this.props.fetchUsers();
    }

    renderUsers(): JSX.Element[] | null {
        const users: User[] = this.props.users;
        if (!users) {
            return null;
        }
        return users.map((user: User) => {
            return (
                <TableRow key={user.id}>
                    <TableCell component="th" align="center" scope="row">
                        {user.name}
                    </TableCell>
                    <TableCell component="th" align="center" scope="row">
                        {format(new Date(user.dateOfBirth), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell align="center">
                        <Tooltip title="Editar">
                            <IconButton className="button" aria-label="Edit"
                                        component='a' href={`/edit/${user.id}`}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton className="button" onClick={() => this.openModal(user)}
                                        aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            );
        });
    }

    render() {
        return (
            <div className="mt-3">
                <Button variant="contained" color="primary" href={`/add`}>
                    Adicionar usuário
                </Button>
                <TableContainer component={Paper} className="mt-3">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Data de nascimento</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderUsers()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal/>
            </div>
        );
    }

    openModal(user: any) {
        this.props.openModal({
            id: user.id,
            title: 'Excluir usuário',
            message: `Deseja excluir o usuário ${user.name}?`
        });
    }
}

const mapStateToProps = (state: any) => ({
    users: state.userReducer.items,
});

export default connect(mapStateToProps, {fetchUsers, openModal})(UserList);