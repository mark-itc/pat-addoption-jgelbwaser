import { useCallback } from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PET_STATUS, ROUTES_PATH } from '../config/config';
import { closeModal, MODAL_OPTIONS, openModal, setAppError } from '../redux/reducers/appSlice';
import UseApi from '../services/useApi';

//dispatch(openModal(MODAL_OPTIONS.login))
export default function UsePet() {

    const currentUser = useSelector(state => state.user.currentUser)
    const pet = useSelector(state => state.pet.selectedPet)
    const pets = useSelector(state => state.pet.pets)
    const dispatch = useDispatch();
    const {
        adoptPet, fosterPet, deletePetFromDb,
        returnPet, savePet, unSavePet, uploadAppPic,
        addPetToDb, updatePetInDb
    } = UseApi()
    //local state:
    const [ctaTxt, setCtaTxt] = useState('Looking your new best friend?');
    const [buttonLeftData, setButtonLeft] = useState();
    const [buttonRightData, setButtonRight] = useState();
    const navigate = useNavigate()



    const deletePet = useCallback(async (petId) => {
        if (!(currentUser?.isAdmin === true)) {
            return (dispatch(setAppError('Only Admin can add pets')))
        }
        const isDeleteConfirmed = window.confirm(`Are you sure you want to delete this pet`)
        if(!isDeleteConfirmed) {
            return dispatch(setAppError('Delete action was canceled'))
        }
        await deletePetFromDb(petId)
    }, [currentUser?.isAdmin, deletePetFromDb, dispatch])


    const addEditPet = async (petData, petPicture) => {
        if (!(currentUser?.isAdmin === true)) {
            return (dispatch(setAppError('Only Admin can add pets')))
        }
        if (petPicture) {
            const picFileName = await uploadAppPic(petPicture)
            petData.picture = picFileName
        }
        petData.type = parseInt(petData.type)
        petData.weight = parseFloat(petData.weight) * 1000
        petData.height = parseInt(petData.height)
        petData.status = PET_STATUS.available
        petData.hypoallergenic = petData.hypoallergenic === "true";
        pet?._id ?  updatePetInDb(petData, pet._id) : addPetToDb(petData)
    }


    useEffect(() => {

        if (!pet) return

        //no user logged in:
        if (!currentUser) {
            setCtaTxt('Looking for your new best friend?');
            setButtonLeft({
                txt: 'Login', action: () => {
                    dispatch(openModal(MODAL_OPTIONS.login))
                }
            });
            setButtonRight({
                txt: 'Sign in', action: () => {
                    dispatch(openModal(MODAL_OPTIONS.signIn))
                }
            });
            return
        }

        const isPetSaved = currentUser.userSavedPets.includes(pet._id)
        const isUserPetCareTaker = currentUser.userPets.includes(pet._id)
        // console.log('isPetLiked', isPetSaved)
        // console.log('isUserPetCareTaker', isUserPetCareTaker)

        //user is admin:  
        if (currentUser.isAdmin) {
            setCtaTxt('Edit or delete this pet:');
            setButtonLeft({
                txt: 'Edit Pet', action: () => {
                    dispatch(openModal(MODAL_OPTIONS.addEditPet))
                }
            });
            setButtonRight({
                txt: 'Delete', action: () => {
                    deletePet(pet._id)
                }
            });
            return
        }

        //user is pet's care taker:  
        if (isUserPetCareTaker) {
            setCtaTxt(`Thank you for taking care of ${pet.name}`);
            setButtonLeft({
                txt: 'Return Pet', action: () => {
                    returnPet(pet._id)
                    dispatch(closeModal())
                }
            });
            setButtonRight({
                txt: 'More Pets', action: () => {
                    dispatch(closeModal())
                }
            });
            return
        }

        //pet is not available:
        if (pet.status !== PET_STATUS.available) {
            setCtaTxt("This pet in not currently available but you can save it to see if it's returned");
            setButtonRight({
                txt: 'More Pets', action: () => {
                    dispatch(closeModal())
                }
            });
            if (isPetSaved) {
                setButtonLeft({
                    txt: 'UnSave', action: () => { unSavePet(pet._id) }
                });
            } else {
                setButtonLeft({
                    txt: 'Save', action: () => { savePet(pet._id) }
                });
            }
            return
        }

        //pet is available
        setCtaTxt(`Want to be ${pet.name}'s furever friend?`);
        setButtonLeft({
            txt: 'Adopt', action: () => {
                adoptPet(pet._id)
                dispatch(closeModal())
                navigate(ROUTES_PATH.myPets)
            }
        });
        setButtonRight({
            txt: 'Foster', action: () => {
                fosterPet(pet._id)
                dispatch(closeModal())
                navigate(ROUTES_PATH.myPets)
            }
        });

    }, [currentUser, pet, dispatch, adoptPet,
        fosterPet, returnPet, savePet, unSavePet, deletePet, navigate])

    return (
        { ctaTxt, buttonLeftData, buttonRightData, addEditPet, deletePet }
    )
}

