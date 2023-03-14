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
        updateUserPets: (state, action) => {
            state.currentUser = {...state.currentUser, userPets: action.payload}
        },
        updateUserSavedPets: (state, action) => {
            state.currentUser = {...state.currentUser, userSavedPets: action.payload}
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentUser,
    clearCurrentUser,
    updateUserPets,
    updateUserSavedPets
} = userSlice.actions

export default userSlice.reducer