import { TRANSACTION_ID_SAVE } from './types';

//save tra
export const getTrasnactionId =  (id) => {
    return {
        type: TRANSACTION_ID_SAVE,
        payload: id
    };
};
