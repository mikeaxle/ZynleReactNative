import { SELECTED_ID } from './types';

export const selectSale = (index) => {
    return {
        type: SELECTED_ID,
        payload: index
    };
};
