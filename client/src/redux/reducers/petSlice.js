import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pets: [],
    myPets:[],
    likedPets:[],
    loading: false,
    error: null,
};

export const petSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        startApiCall: state => {
            state.loading = true
            state.error = null
        },
        setPets: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.currentUser;
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
    setPets,
    startApiCall,
    setErrorState,
    clearErrorState,
    setLoadingFalse,
    resetApi
} = petSlice.actions

export default petSlice.reducer