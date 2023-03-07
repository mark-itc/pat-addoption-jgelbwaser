import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pets: [],
    myPets:[],
    filters: {
        type: null,
        height_min: null, 
        height_max: null, 
        weight_max: null, 
        weight_min: null,
        status: null, 
        name: null
    },
    likedPets:[],
    loading: false,
    error: null,
};

export const petSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setPets: (state, action) => {
            state.pets = action.payload;
        },
        clearPets: (state) => {
            state.myPets =[];
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setPets,
    clearPets
} = petSlice.actions

export default petSlice.reducer