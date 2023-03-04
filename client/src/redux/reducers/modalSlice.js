import { createSlice } from "@reduxjs/toolkit"
import Login from "../../components/Modal/Login";
import PetInfo from "../../components/Modal/PetInfo";
import SignIn from "../../components/Modal/SignIn";
import UserInfo from "../../components/Modal/UserInfo";

const initialState = {
    isOpen: false,
    selectedModal: null,
};


export const MODAL_OPTIONS = {
    login: 1,
    signIn: 2,
    petInfo: 3,
    userInfo: 4
}

export const MODAL_COMPONENTS = {
    [MODAL_OPTIONS.login] : <Login/>,
    [MODAL_OPTIONS.signIn] : <SignIn/>,
    [MODAL_OPTIONS.petInfo] : <PetInfo/>,
    [MODAL_OPTIONS.userInfo] : <UserInfo/>,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) =>{
            state.selectedModal = action.payload;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalOption = null;
            state.isOpen = false;
            state.componentKey = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    openModal,
    closeModal
} = modalSlice.actions

export const SelectedComponent = (state) => state.modal.components[state.modal.componentKey];

export default modalSlice.reducer
