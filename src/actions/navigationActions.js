import { NAVIGATE, BACK_SCREEN } from './types';

//action to change screens
export const moveToScreen = (screen) => {
    return {
        type: NAVIGATE,
        payload: screen
    };
};


//action to go back a screen
export const backScreen = () => {
    return {
        type: BACK_SCREEN,
       // payload: screen
    };
};