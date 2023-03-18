import { createSlice } from '@reduxjs/toolkit'
import { PET_STATUS, PET_TYPES } from '../../config/config';

const initialState = {
    pets: [],
    petsInUserCare:[],
    petsSavedByUser:[],
    selectedPet: null,
    filters: {
        type: PET_TYPES.all,
        height_min: null, 
        height_max: null, 
        weight_max: null, 
        weight_min: null,
        status: PET_STATUS.all, 
        name: null
    },
    showExtraFilters: false,
    extraFiltersAreActive: false,
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
        setMoreFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        },
        setExtraFiltersAreActive: (state, action) => {
            state.extraFiltersAreActive = action.payload
        },
        clearExtraFilters: (state) => {
            state.filters = {...initialState.filters, type: state.filters.type}
        },
        setSelectedPet: (state, action) => {
            state.selectedPet = action.payload;
        },
        toggleShowExtraFilters: (state) => {
            state.showExtraFilters = !state.showExtraFilters
        },
        addNewPet: (state, action) => {
            state.pets = [...state.pets,  action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setPets,
    addNewPet,
    setSelectedPet,
    setFilterType,
    clearPets,
    setPetsInUserCare,
    setPetsSavedByUser,
    clearPetsInUserCare,
    clearPetsSavedByUser,
    setMoreFilters,
    clearExtraFilters,
    toggleShowExtraFilters,
    setExtraFiltersAreActive
} = petSlice.actions

export default petSlice.reducer