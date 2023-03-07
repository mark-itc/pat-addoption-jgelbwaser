import { createSlice } from '@reduxjs/toolkit'
import { PERMISSION_LEVEL } from '../../config/config';

const initialState = {
    permissionLevel: PERMISSION_LEVEL.guest,
    accessToken: null,
    refreshToken: null,
    // currentUser: null,
    // isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogout: (state) => {
            // state.loading = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.currentUser = null
            state.isLoggedIn = false;
            state.permissionLevel = PERMISSION_LEVEL.guest

        },
        setLogin: (state, action) => {
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
    },
})

// Action creators are generated for each case reducer function
export const {
    startApiCall,
    setTokens,
    setLogout,
    setLogin,
    setUserUpdatedInfo,
} = authSlice.actions

export default authSlice.reducer