import { SALE_CREATE, SALE_DELETE, SALE_UPDATE_AMOUNT, CLEAR_SALES, SALE_UPDATE_NOTE } from '../actions/types';
import { NavigationActions } from 'react-navigation';

//define initial state

const INITIAL_NAV_STATE = [];


export default (state = INITIAL_NAV_STATE, action) => {


    console.log(action);
    console.log(state);


    //check action type
    switch (action.type){
        // add sale
        case SALE_CREATE:
            return [ ...state, { amount: action.payload.amount, note: action.payload.note} ];

        case SALE_UPDATE_AMOUNT:
             return  [...state.map(function (item, index) {
                 if( index === Number(action.payload.index)){

                     return item = {
                         amount:  action.payload.amount,
                         note: item.note
                     }

                 } else {
                     return item
                 }
             })]

        case SALE_UPDATE_NOTE:
            return  [...state.map(function (item, index) {
                if( index === Number(action.payload.index)){

                    return item = {
                        amount: item.amount,
                        note: action.payload.note
                    }

                } else {
                    return item
                }
            })]


        case SALE_DELETE:

            return [...state].filter((item, index) => index !== Number(action.payload))

        case CLEAR_SALES:

            return [];

        default:
            return state;

    }
};


/*
 return [...state.slice(0, action.payload),
 ...state.slice(action.payload + 1, state.length)]


 [...state.slice(Number(action.payload), 1)]

 */