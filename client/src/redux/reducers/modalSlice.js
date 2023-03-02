import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    modalContent: null,
};

const MODAL_CONTENT_OPTIONS = {
    login: 1,
    signIn: 2,
    pet: 3,
    user: 4
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.modalContent = MODAL_CONTENT_OPTIONS.login;
            state.isOpen = true;
        },
        openSignInModal: (state) => {
            state.modalContent = MODAL_CONTENT_OPTIONS.signIn;
            state.isOpen = true;
        },
        openPetModal: (state) => {
            state.modalContent = MODAL_CONTENT_OPTIONS.pet;
            state.isOpen = true;
        },
        openUserModal: (state) => {
            state.modalContent = MODAL_CONTENT_OPTIONS.user;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalContent = null;
            state.isOpen = false;
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    openLoginModal,
    openSignInModal,
    openPetModal,
    openUserModal,
    closeModal
} = modalSlice.reducer

export default modalSlice.reducer
