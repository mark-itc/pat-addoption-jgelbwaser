import { createSlice } from '@reduxjs/toolkit'
import { PERMISSION_LEVEL } from '../../config/config';

const initialState = {
    permissionLevel: PERMISSION_LEVEL.guest,
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
            state.isLoggedIn = false;
            state.permissionLevel = PERMISSION_LEVEL.guest

        },
        setLoginState: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.currentUser;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.permissionLevel = action.payload.isAdmin ? PERMISSION_LEVEL.admin : PERMISSION_LEVEL.user;
            state.isLoggedIn = true
        },
        setUserUpdatedInfo: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.permissionLevel = action.payload.isAdmin ? PERMISSION_LEVEL.admin : PERMISSION_LEVEL.user;
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
        resetApi: (state) => {
            state.loading = false;
            state.error = false;
        }

    },
})

// Action creators are generated for each case reducer function
export const {
    startApiCall,
    setTokensState,
    setLogoutState,
    setLoginState,
    setErrorState,
    clearErrorState,
    setLoadingFalse,
    setUserUpdatedInfo,
    resetApi
} = authSlice.actions

export default authSlice.reducer