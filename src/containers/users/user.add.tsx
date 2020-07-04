import React, {Component} from 'react';
import {connect} from 'react-redux';
import {User, UsersState} from "../../reducers/user.reducer";
import {addUser, onChangeProps} from "../../actions/user.action";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

export interface UserAddProps {
    addUser: (user: User) => any;
    onChangeProps: (props: string, value: any) => any;
    state: UsersState;
}

class UserAdd extends Component<UserAddProps> {

    handleSave() {
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

    handleChangeDate = (prop: string) => (event: any) => {
        this.props.onChangeProps(prop, event);
    };

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="mt-3">
                    <Paper elevation={1} className="p-2">
                        <form>
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        id="name"
                                        label="Nome"
                                        className="textField"
                                        value={this.props.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                    />
                                </Grid>
                                <DatePicker
                                    label="Data de nascimento"
                                    value={this.props.state.dateOfBirth}
                                    onChange={this.handleChangeDate('dateOfBirth')}
                                    animateYearScrolling
                                />
                            </Grid>
                            <Grid container>

                                <Grid item container justify="flex-end">
                                    <Button variant="contained" color="default" href="/">
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => this.handleSave()}
                                            className="ml-1">
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Paper>
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}

const mapStateToProps = (state: any) => ({
    state: state.userReducer,
});

export default connect(mapStateToProps, {addUser, onChangeProps})(UserAdd);