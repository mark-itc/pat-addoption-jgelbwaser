import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    accessToken: null,
    refreshToken: null,
    currentUser: null,
    loading: false,
    error: null,
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        startApiCall: state => {
            state.loading = true
            state.error = null
        },
        setTokensState: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogoutState: (state) => {
            state.loading = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.currentUser = null
            state.isLoggedIn = false
        },
        setLoginState: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.currentUser;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true
        },
        setErrorState: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearErrorState: (state) => {
            state.error = null;
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    incrementByAmount,
    startApiCall,
    setTokensState,
    setLogoutState,
    setLoginState,
    setErrorState,
    clearErrorState,
    setLoadingFalse,
} = authSlice.actions

export default authSlice.reducer