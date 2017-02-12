import React from 'react';

import {
    AppRegistry,
} from 'react-native';

import {
    NavigationActions,
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';

import {
    Provider,
    connect,
} from 'react-redux';

import {
    createStore,
    combineReducers,
} from 'redux';

import reducers from './reducers'; //import reducers

/**  import scenes **/

import LoginForm from './components/LoginForm';
import Charge from './components/Charge';
import ChargeCard from './components/ChargeCard';
import KeyPad from './components/Keypad';
import PastSales from './components/PastSales';
import PaymentSuccess from './components/PaymentSuccess';
import SalesList from './components/SaleList';
import SalesDetail from './components/SalesDetail';

//set screen conifigurations for Stack Navigator
const AppRouteConfigs = {
    LoginForm: { screen: LoginForm },
    Charge: { screen: Charge },
    ChargeCard: { screen: ChargeCard },
    KeyPad: { screen: KeyPad },
    PastSales: { screen: PastSales },
    PaymentSuccess: { screen: PaymentSuccess },
    SalesList: { screen: SalesList },
    SalesDetail: { screen: SalesDetail },
}

export const AppNavigator = StackNavigator(AppRouteConfigs);


//entry point for app with redux
const AppWithNavigationState = connect(state => ({
    nav: state.nav,
}))(({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

//create store
const store = createStore(reducers);

//wrap entire app in redux
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}


//register component
AppRegistry.registerComponent('Zynle', () => App);
