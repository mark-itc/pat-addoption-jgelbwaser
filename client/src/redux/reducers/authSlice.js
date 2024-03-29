import { createSlice } from '@reduxjs/toolkit'
import { PERMISSION_LEVEL } from '../../config/config';

const initialState = {
    permissionLevel: PERMISSION_LEVEL.guest,
    accessToken: null,
    refreshToken: null,
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
            state.accessToken = null;
            state.refreshToken = null;
            state.permissionLevel = PERMISSION_LEVEL.guest

        },
        setLogin: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.permissionLevel = action.payload.isAdmin ? PERMISSION_LEVEL.admin : PERMISSION_LEVEL.user;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    startApiCall,
    setTokens,
    setLogout,
    setLogin,
    // setUserUpdatedInfo,
} = authSlice.actions

export default authSlice.reducer