import React from 'react';
import './App.less';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import VerifyLogin from "./componets/VerifyLogin";
import Home from "./page/home/Home";
import Group from "./page/Group";
import Count from "./page/list/Count";

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
                            <Route path="/home/group" exact component={Group}/>
                            <Route path="/list/count" exact component={Count}/>
                        </Switch>
                    </VerifyLogin>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
