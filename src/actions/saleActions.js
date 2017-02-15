import { SALE_CREATE, SALE_DELETE, SALE_UPDATE_AMOUNT,SALE_UPDATE_NOTE, CLEAR_SALES } from './types';


//action to create sale
export const createSale =  ({amount, note}) => {
    return {
        type: SALE_CREATE,
        payload: {amount, note}
    };
};


//action to edit sale amount
export const updateSaleAmount = (amount, index) => {
    return {
        type: SALE_UPDATE_AMOUNT,
        payload: { amount, index }
    };
};

//action to edit sale note
export const updateSaleNote = (note, index) => {
    return {
        type: SALE_UPDATE_NOTE,
        payload: { note, index }
    };
};




export const deleteSale = (index) => {
    return {
        type: SALE_DELETE,
        payload: index
    };
};

export const clearSales = () => {
    return {
        type: CLEAR_SALES
    }
}