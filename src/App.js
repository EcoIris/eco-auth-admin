import React from 'react';
import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import VerifyLogin from "./components/VerifyLogin";
import Home from "./page/home/Home";
import UserTable from "./page/user/UserTable";
import UserFrom from './page/from/UserFrom';
import IProTable from "./page/user/ProTable";
import IProFrom from "./page/from/ProFrom";

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
                            <Route path="/components/pro-table" exact component={IProTable}/>
                            <Route path="/components/user-from" exact component={UserFrom}/>
                            <Route path="/components/pro-from" exact component={IProFrom}/>
                        </Switch>
                    </VerifyLogin>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
