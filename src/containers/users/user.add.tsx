import React, {Component} from 'react';
import {connect} from 'react-redux';
import {User, UsersState} from "../../reducers/user.reducer";
import {addUser, getUser, onChangeProps, updateUser} from "../../actions/user.action";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {RouteComponentProps} from 'react-router-dom';

export interface UserAddProps {
    addUser: (user: User) => any;
    updateUser: (user: User) => any;
    onChangeProps: (props: string, value: any) => any;
    getUser: (id: string) => any;
    state: UsersState;
}

type Props = UserAddProps & RouteComponentProps<any>

class UserAdd extends Component<Props> {

    componentDidMount() {
        const {match: {params}} = this.props;

        if (params.id) {
            this.props.getUser(params.id);
        }
    }

    handleSave() {
        const payload: User = {
            id: this.props.state.id,
            name: this.props.state.name,
            dateOfBirth: this.props.state.dateOfBirth,
            active: this.props.state.active,
        }
        const {match: {params}} = this.props;
        if (params.id) {
            this.props.updateUser(payload);
            return;
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
                            <Grid className="d-block" container>
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
                                <Grid item xs={6}>
                                    <DatePicker
                                        label="Data de nascimento"
                                        value={this.props.state.dateOfBirth}
                                        onChange={this.handleChangeDate('dateOfBirth')}
                                        animateYearScrolling
                                    />
                                </Grid>
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

export default connect(mapStateToProps, {addUser, onChangeProps, getUser, updateUser})(UserAdd);