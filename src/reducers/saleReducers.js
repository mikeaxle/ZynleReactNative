import { SALE_CREATE, SALE_DELETE, SALE_UPDATE } from '../actions/types';
import { NavigationActions } from 'react-navigation';

//define initial state

const INITIAL_NAV_STATE = [];


export default (state = INITIAL_NAV_STATE, action) => {

console.log(state);

    //check action type
    switch (action.type){
        // add sale
        case SALE_CREATE:
            return [ ...state, { amount: action.payload.amount, note: action.payload.note} ];

        case SALE_UPDATE:

            return [...state.slice(0, action.payload.index),
                state[action.payload.index].amount = action.payload.amount,
                state[action.payload.index].amount = action.payload.note,
                ...state.slice(action.payload.index + 1) ]

        case SALE_DELETE:

            return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)]

        default:
            return state;

    };
};