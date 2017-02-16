import { combineReducers } from 'redux';
import navigationReducers from './navigationReducers';
import saleReducers from './saleReducers';
import saleSelectReducer from './saleSelectReducer';
import transactionReducers from './transactionReducers'

export default combineReducers({
    nav: navigationReducers,
    sale: saleReducers,
    selectedSale: saleSelectReducer,
    transaction: transactionReducers
});

