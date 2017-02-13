import { NAVIGATE, BACK_SCREEN } from '../actions/types'; //import action types
import { AppNavigator } from '../App'; //import stack navigator from App entry point
import { NavigationActions } from 'react-navigation';

//define initial navigation state
const INITIAL_NAV_STATE = {
    index: 0,
    routes: [
       { key: 'LoginForm', routeName: 'LoginForm' },
       // { key: 'Charge', routeName: 'Charge' },
    ],
};

export default (state = INITIAL_NAV_STATE, action) => {



    switch (action.type){
        case NAVIGATE:
            return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: action.payload }), state);

        case BACK_SCREEN:
            return AppNavigator.router.getStateForAction(NavigationActions.BACK, state);

        default:
            return state;

    };

    return state;
};