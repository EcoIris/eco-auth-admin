import React from 'react';
import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./page/login/Login";
import VerifyLogin from "./common/VerifyLogin";
import Home from "./page/home/Home";
import UserTable from "./page/user/UserTable";
import Setting from "./page/account/Setting";
import User from "./page/auth/User";
import RoleList from "./page/auth/RoleList";
import NotFound from "./page/404";
import NotAuthorized from "./page/403";

const App = React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route>
                    <VerifyLogin>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/user/user-table" exact component={UserTable}/>
                            <Route path="/account/setting" exact component={Setting}/>
                            <Route path="/auth/user-list" exact component={User}/>
                            <Route path="/auth/role-list" exact component={RoleList}/>
                            <Route path="/403" exact component={NotAuthorized}/>
                            <Route component={NotFound} />
                        </Switch>
                    </VerifyLogin>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
