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
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentUser,
    clearCurrentUser,
} = userSlice.actions

export default userSlice.reducer