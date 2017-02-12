import { NAVIGATE } from './types';

//action to change screens
export const moveToScreen = (screen) => {
    return {
        type: NAVIGATE,
        payload: screen
    };
};