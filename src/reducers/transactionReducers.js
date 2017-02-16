import { TRANSACTION_ID_SAVE  } from '../actions/types'

export  default (state = null, action) => {

    console.log(action);
    console.log(state);

    //check action type
    switch (action.type){
        // add sale
        case TRANSACTION_ID_SAVE:
            return action.payload;

        default:
            return state;

    };
}