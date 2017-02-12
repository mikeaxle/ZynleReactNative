import { SALE_CREATE, SALE_DELETE, SALE_UPDATE } from '../actions/types';
import { NavigationActions } from 'react-navigation';

//define initial state

const INITIAL_NAV_STATE = [];


export default (state = INITIAL_NAV_STATE, action) => {

    console.log(action);

    //check action type
    switch (action.type){
        // add sale
        case SALE_CREATE:
            return [ ...state, { amount: action.payload.amount, note: action.payload.note} ];

        default:
            return state;

    };

    return state;
};