import React from 'react';
import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import VerifyLogin from "./components/VerifyLogin";
import Home from "./page/home/Home";
import UserInfo from "./page/user/UserInfo";
import UserTable from "./page/table/UserTable";
import UserFrom from './page/from/UserFrom';
import IProTable from "./page/table/ProTable";
import IProFrom from "./page/from/ProFrom";
import PageTransfer from "./page/transfer/PageTransfer";

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
                            <Route path="/user/info" exact component={UserInfo}/>
                            <Route path="/components/user-table" exact component={UserTable}/>
                            <Route path="/components/pro-table" exact component={IProTable}/>
                            <Route path="/components/user-from" exact component={UserFrom}/>
                            <Route path="/components/pro-from" exact component={IProFrom}/>
                            <Route path="/components/page-transfer" exact component={PageTransfer}/>
                        </Switch>
                    </VerifyLogin>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
