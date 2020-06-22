import React from 'react';
import history from './helpers/history';
import {Route, Router, Switch} from 'react-router-dom';
import UserList from "./containers/users/user.list";
import UserAdd from "./containers/users/user.add";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>

                    <Switch>
                        <Route path="/" exact component={UserList}/>
                        <Route path="/add" exact component={UserAdd}/>
                        {/*<Route path="/users/:id" exact component={PostShow}/>*/}
                        {/*<Route path="/users/edit/:id" exact component={PostEdit}/>*/}
                        {/*<Route path="/users/delete/:id" exact component={PostDelete}/>*/}
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;