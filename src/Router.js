import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Charge from './components/Charge';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="firstRun">
                <Scene key="loginform" component={LoginForm} title="Login Form" initial/>
            </Scene>

            <Scene key="main">
                <Scene  key="charge" component={Charge} title="Charge" initial/>
            </Scene>


        </Router>
    );
};

export default RouterComponent;