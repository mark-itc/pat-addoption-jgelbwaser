import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pets: [],
    petsInUserCare:[],
    petsSavedByUser:[],
    selectedPet: null,
    filters: {
        type: 0,
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
        setPetsInUserCare: (state, action) => {
            state.petsInUserCare = action.payload;
        },
        setPetsSavedByUser: (state, action) => {
            state.petsSavedByUser = action.payload;
        },
        clearPets: (state) => {
            state.pets =[];
        },
        clearPetsInUserCare: (state) => {
            state.petsInUserCare = [];
        },
        clearPetsSavedByUser: (state) => {
            state.petsSavedByUser = [];
        },
        setFilterType:  (state, action) => {
            state.filters.type = action.payload;
        },
        setSelectedPet: (state, action) => {
            state.selectedPet = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setPets,
    setSelectedPet,
    setFilterType,
    clearPets,
    setPetsInUserCare,
    setPetsSavedByUser,
    clearPetsInUserCare,
    clearPetsSavedByUser
} = petSlice.actions

export default petSlice.reducer