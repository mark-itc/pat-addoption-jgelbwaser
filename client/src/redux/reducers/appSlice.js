import { createSlice } from "@reduxjs/toolkit"
import Login from "../../components/Modal/Login";
import PetInfo from "../../components/Modal/PetInfo";
import SignIn from "../../components/Modal/SignIn";
import UpdateUser from "../../components/Modal/UpdateUser";


export const MODAL_OPTIONS = {
    login: 1,
    signIn: 2,
    petInfo: 3,
    updateUser: 4
}

export const MODAL_COMPONENTS = {
    [MODAL_OPTIONS.login] : <Login/>,
    [MODAL_OPTIONS.signIn] : <SignIn/>,
    [MODAL_OPTIONS.petInfo] : <PetInfo/>,
    [MODAL_OPTIONS.updateUser] : <UpdateUser/>,
}

const initialState = {
    modal: {
        isOpen: false,
        selectedModal: null,
    },
    loading: false,
    error: null,
};


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openModal: (state, action) =>{
            state.modal.selectedModal = action.payload;
            state.modal.isOpen = true;
        },
        closeModal: (state) => {
            state.modal.modalOption = null;
            state.modal.isOpen = false;
            state.modal.componentKey = null;
        },
        startApiCall: state => {
            state.loading = true
            state.error = null
        },
        setAppError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearAppError: (state) => {
            state.error = null;
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetAppStatus: (state) => {
            state.loading = false;
            state.error = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    openModal,
    closeModal,
    startApiCall,
    setAppError,
    clearAppError,
    setLoadingFalse,
    setUserUpdatedInfo,
    resetAppStatus
} = appSlice.actions

//export const SelectedComponent = (state) => state.modal.components[state.modal.componentKey];

export default appSlice.reducer
