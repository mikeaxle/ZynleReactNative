import { SELECTED_ID } from '../actions/types';

//define initial state

const INITIAL_NAV_STATE = null;


export default (state = INITIAL_NAV_STATE, action) => {

    //console.log(action.payload);

    //check action type
    switch (action.type){
        // add sale
        case SELECTED_ID:
            return   type.payload;

        default:
            return state;

    };

    return state;
};