import { SALE_CREATE, SALE_DELETE, SALE_UPDATE } from './types';


//action to create sale
export const createSale =  ({amount, note}) => {
    return {
        type: SALE_CREATE,
        payload: {amount, note}
    };
};


//action to edit sale
export const updateSale = (amount, note, index) => {
    return {
        type: SALE_UPDATE,
        payload: { amount, note, index }
    };
};

export const deleteSale = ({index}) => {
    return {
        type: SALE_DELETE,
        payload: index
    };
};