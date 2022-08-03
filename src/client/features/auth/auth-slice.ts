import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    token: null
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    }
});


const { actions, reducer } = authSlice;

export const { login, logout } = actions;

export default reducer;