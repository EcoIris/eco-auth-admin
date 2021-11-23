import React from 'react';
import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import VerifyLogin from "./components/VerifyLogin";
import Home from "./page/home/Home";
import UserTable from "./page/user/UserTable";
import Setting from "./page/account/Setting";
import User from "./page/auth/User";
import NotFound from "./page/404";

const App = React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route>
                    <VerifyLogin>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/user/user-table" exact component={UserTable}/>
                            <Route path="/account/setting" exact component={Setting}/>
                            <Route path="/auth/user-list" exact component={User}/>
                            <Route  component={NotFound} />
                        </Switch>
                    </VerifyLogin>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
