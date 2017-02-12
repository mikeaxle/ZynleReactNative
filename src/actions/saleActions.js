import { SALE_CREATE, SALE_DELETE, SALE_UPDATE } from './types';


//action to create sale
export const createSale =  ({amount, note}) => {
    return {
        type: SALE_CREATE,
        payload: {amount, note}
    };
};