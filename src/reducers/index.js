import { combineReducers } from 'redux';
import navigationReducers from './navigationReducers';
import saleReducers from './saleReducers';

export default combineReducers({
    nav: navigationReducers,
    sale: saleReducers,
});

