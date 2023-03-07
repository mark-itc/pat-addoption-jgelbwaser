import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        // setLogout: (state) => {
        //     state.currentUser = null
        //     state.isLoggedIn = false;
        //     state.permissionLevel = PERMISSION_LEVEL.guest

        // },
        // setUser: (state, action) => {
        //     state.currentUser = action.payload.currentUser;
        //     state.accessToken = action.payload.accessToken;
        //     state.refreshToken = action.payload.refreshToken;
        //     state.permissionLevel = action.payload.isAdmin ? PERMISSION_LEVEL.admin : PERMISSION_LEVEL.user;
        //     state.isLoggedIn = true
        // },
        // setUserUpdatedInfo: (state, action) => {
        //     state.currentUser = action.payload;
        //     state.isLoggedIn = true
        // },
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentUser,
    clearCurrentUser,
} = userSlice.actions

export default userSlice.reducer