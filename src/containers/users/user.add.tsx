import React, {Component} from 'react';
import {connect} from 'react-redux';
import {User, UsersState} from "../../reducers/user.reducer";
import {addUser, onChangeProps} from "../../actions/user.actions";
import {Button, Grid, Paper, TextField} from "@material-ui/core";

export interface UserAddProps {
    addUser: (user: User) => any;
    onChangeProps: (props: string, value: any) => any;
    state: UsersState;
}

class UserAdd extends Component<UserAddProps> {

    handleClick() {
        const payload: User = {
            id: this.props.state.id,
            name: this.props.state.name,
            dateOfBirth: this.props.state.dateOfBirth,
            active: this.props.state.active,
        }
        this.props.addUser(payload);
    }

    handleChange = (prop: string) => (event: any) => {
        this.props.onChangeProps(prop, event.target.value);
    };

    render() {
        return (
            <div className="mt-3">
                <Paper elevation={1} className="p-2">
                    <form>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    label="Nome"
                                    value={this.props.state.name}
                                    onBlur={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container>

                            <Grid item container justify="flex-end">
                                <Button variant="contained" color="default" href="/">
                                    Cancelar
                                </Button>
                                <Button variant="contained" color="primary" className="ml-1" onClick={() => this.handleClick()}>
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state: UsersState) => ({
    state: state,
});

export default connect(mapStateToProps, {addUser, onChangeProps})(UserAdd);