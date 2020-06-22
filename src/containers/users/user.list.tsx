import React, {Component} from 'react';
import {connect} from 'react-redux';
import {User, UsersState} from "../../reducers/user.reducer";
import {fetchUsers} from "../../actions/user.actions";
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

export interface UserListProps {
    users: User[];
    fetchUsers: () => any;
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
                        {user.dateOfBirth}
                    </TableCell>
                    <TableCell align="center">
                        <Tooltip title="Editar">
                            <IconButton className="button" aria-label="Edit"
                                        component='a' href={`/edit/${user.id}`}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton className="button" component='a' aria-label="delete">
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
            </div>
        );
    }
}

const mapStateToProps = (state: UsersState) => ({
    users: state.items,
});

export default connect(mapStateToProps, {fetchUsers})(UserList);