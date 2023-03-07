import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: null,
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        startApiCall: state => {
            state.loading = true
            state.error = null
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
    setErrorState,
    clearErrorState,
    setLoadingFalse,
    setUserUpdatedInfo,
    resetApi
} = apiSlice.actions

export default apiSlice.reducer