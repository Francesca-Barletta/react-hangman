import {configureStore} from '@reduxjs/toolkit';

import hangmanReducer from './reducers/hangman-reducer'

export const store = configureStore({
    reducer:{
        guess: hangmanReducer
    },
})

export default store;