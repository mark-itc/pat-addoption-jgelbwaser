import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PET_STATUS } from '../config/config';
import { closeModal, MODAL_OPTIONS, openModal } from '../redux/reducers/appSlice';
import UseApi from '../services/useApi';

//dispatch(openModal(MODAL_OPTIONS.login))
export default function UsePet() {

    const currentUser = useSelector(state => state.user.currentUser)
    const pet = useSelector(state => state.pet.selectedPet)
    const dispatch = useDispatch();
    const{
        adoptPet, fosterPet, editPet, deletePet, 
        returnPet, savePet, unSavePet
    } = UseApi()
    //local state:
    const [ctaTxt, setCtaTxt] = useState('Looking your new best friend?');
    const [buttonLeftData, setButtonLeft] = useState();
    const [buttonRightData, setButtonRight] = useState();

    useEffect(() => {

        if (!pet) return

        //no user logged in:
        if (!currentUser) {
            setCtaTxt('Looking for your new best friend?');
            setButtonLeft({
                txt: 'Login', action: () => {
                    dispatch(openModal(MODAL_OPTIONS.login))
                }});
            setButtonRight({
                txt: 'Sign in', action: () => {
                    dispatch(openModal(MODAL_OPTIONS.signIn))
                }});
            return
        }

        const isPetSaved = currentUser.userSavedPets.includes(pet._id)
        const isUserPetCareTaker = currentUser.userPets.includes(pet._id)
        // console.log('isPetLiked', isPetSaved)
        // console.log('isUserPetCareTaker', isUserPetCareTaker)

        //user is admin:  
        if (currentUser.isAdmin) {
            setCtaTxt('As an admin you can edit or delete this pet:');
            setButtonLeft({
                txt: 'Edit Pet', action: () => {
                    editPet(pet._id)
                }});
            setButtonRight({
                txt: 'Delete', action: () => {
                    deletePet(pet._id)
                }});
            return
        }

         //user is pet's care taker:  
        if (isUserPetCareTaker) {
            setCtaTxt(`Thank you for taking care of ${pet.name}`);
            setButtonLeft({
                txt: 'Return Pet', action: () => {
                    returnPet(pet._id)
                }});
            setButtonRight({
                txt: 'More Pets', action: () => {
                    dispatch(closeModal())
                }});
            return
        }
    
        //pet is not available:
        if (pet.status !== PET_STATUS.available) {
            setCtaTxt("This pet in not currently available but you can save it to see if it's returned");
            setButtonRight({
                txt: 'More Pets', action: () => {
                    dispatch(closeModal())
                }});
            if (isPetSaved) {
                setButtonLeft({
                    txt: 'UnSave', action: () => {unSavePet(pet._id)}
                });
            } else {
                console.log('pet not liked ')
                setButtonLeft({
                    txt: 'Save', action: () => {savePet(pet._id) }
                });
            }
            return
        }

        //pet is available
        setCtaTxt(`Want to be ${pet.name}'s furever friend?`);
        setButtonLeft({
            txt: 'Adopt', action: () => {
                adoptPet(pet._id)
            }});
        setButtonRight({
            txt: 'Foster', action: () => {
                fosterPet(pet._id)
            }});

    }, [currentUser, pet, deletePet, dispatch, adoptPet, editPet,  fosterPet, returnPet,savePet, unSavePet])

    return (
        { ctaTxt, buttonLeftData, buttonRightData }
    )
}

