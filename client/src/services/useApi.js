import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout, setLogin } from '../redux/reducers/authSlice';
import { startApiCall, setAppError, setLoadingFalse, closeModal } from '../redux/reducers/appSlice';
import { axiosAuthCall, axiosCall } from '../lib/axios'
import { clearCurrentUser, setCurrentUser, updateUserPets, updateUserSavedPets } from '../redux/reducers/userSlice';
import { addNewPet, clearExtraFilters, clearPetsInUserCare, clearPetsSavedByUser, removePetFromPets, setPets, setPetsInUserCare, setPetsSavedByUser, setSelectedPet, updatePetInPets } from '../redux/reducers/petSlice';
import { PET_STATUS } from '../config/config';


export default function UseApi() {

  const { currentUser } = useSelector(state => state.user)
  const { filters, pets, extraFiltersAreActive } = useSelector(state => state.pet)
  const dispatch = useDispatch();
  const api_url = process.env.REACT_APP_API_URL


  const login = async ({ email, password }) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/login", { email, password });
      const { accessToken, refreshToken, currentUser, petsInUserCare, petsSavedByUser } = res.data
      dispatch(setLogin({ accessToken, refreshToken, isAdmin: currentUser.isAdmin }))
      dispatch(setCurrentUser(currentUser))
      dispatch(setPetsInUserCare(petsInUserCare))
      dispatch(setPetsSavedByUser(petsSavedByUser))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }


  const logout = useCallback(() => {
    dispatch(setLogout());
    dispatch(clearCurrentUser());
    dispatch(clearPetsInUserCare());
    dispatch(clearPetsSavedByUser())
  }, [dispatch])


  const handleApiError = useCallback((error) => {
    if (error.response?.data?.logOut === true) {
      logout();}
    const errorMsg = error.response?.data?.error || error.message;
    dispatch(setAppError(errorMsg))
    console.log(error);
  }, [dispatch, logout])


  const signIn = async (newUserData) => {
    try {
      dispatch(startApiCall())
      const res = await axiosCall.post(api_url + "/register", newUserData);
      const { accessToken, refreshToken, currentUser, petsInUserCare, petsSavedByUser } = res.data
      dispatch(setLogin({ accessToken, refreshToken, isAdmin: currentUser.isAdmin }))
      dispatch(setCurrentUser(currentUser))
      dispatch(setPetsInUserCare(petsInUserCare))
      dispatch(setPetsSavedByUser(petsSavedByUser))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }


  const getPets = useCallback(async () => {
    try {
      dispatch(startApiCall())
      const res = await axiosCall.get(api_url + "/pet", { params: filters });
      dispatch(setPets(res.data.pets))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error) }
  }, [filters, api_url, handleApiError, dispatch])

 
  const getPetByID = async (id) => {
    try {
      dispatch(startApiCall())
      const res = await axiosCall.get(api_url + "/pet/" + id);
      dispatch(setLoadingFalse())
      return res.data.pet
    } catch (error) {
      handleApiError(error)
    }
  }


  const setSelectedPetByID = async (id) => {
    const pet = await getPetByID(id)
    dispatch(setSelectedPet(pet))
  }


  const updateUser = async (newUserData) => {
    dispatch(startApiCall())
    try {
      let data = { ...newUserData }
      const uid = currentUser.uid
      //remove Password data from requests if they are empty
      const pwd = newUserData.password
      if (!pwd) {
        const { password, confirmPassword, ...dataWithoutPasswords } = data
        data = dataWithoutPasswords   }
      const res = await axiosAuthCall.post(api_url + `/user/${uid}`, data);
      const updatedCurrentUser = res.data.currentUser
      dispatch(setCurrentUser(updatedCurrentUser));
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }


  const checkAuth = async () => {
    dispatch(startApiCall())
    try {
      const res = await axiosAuthCall.get(api_url + "/auth", {});
      console.log(res.data)
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }

 const uploadAppPic = async (file) => {
    dispatch(startApiCall())
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axiosAuthCall.post(api_url + "/upload_pic", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      return res.data.fileName
    } catch (error) {
      handleApiError(error)
    }
  }

  const addPetToDb = async (newPet) => {
    dispatch(startApiCall())
    try {
      const res = await axiosAuthCall.post(api_url + "/pet", newPet);
      const savedPet = res.data
      if(extraFiltersAreActive) {
         dispatch(clearExtraFilters())
      }
      
      dispatch(addNewPet(savedPet))
      dispatch(closeModal()) 
      dispatch(setLoadingFalse()) 
    } catch (error) {
      handleApiError(error)
    }
  }

  const updatePetInDb = async (newPet, petId) => {
    try {
      dispatch(startApiCall())
      const res = await axiosAuthCall.put(api_url + `/pet/${petId}`, newPet);
      const savedPet = res.data
      if(extraFiltersAreActive) {
         dispatch(clearExtraFilters())
      }
      dispatch(updatePetInPets(savedPet)) 
      dispatch(closeModal()) 
      dispatch(setLoadingFalse())
      return savedPet
    } catch (error) {
      handleApiError(error)
    }
  }

  const deletePetFromDb = useCallback( async (petId) => {
    try {
      dispatch(startApiCall())
      const res = await axiosAuthCall.delete(api_url + `/pet/${petId}`);
      const deletedPetId = res.data
      dispatch(removePetFromPets(deletedPetId)) 
      dispatch(closeModal()) 
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  },[api_url, dispatch, handleApiError])


  const takeCareOfPet = useCallback( async (petId, newStatus) => {
      try {
        dispatch(startApiCall())
        const res = await axiosAuthCall.post(api_url + `/pet/${petId}/adopt`, {Type: newStatus});
        
        ////add pet  uid and status to pet
        const newPets = pets.map((currentPet) => {
          const newPet = {...currentPet}
          if(currentPet._id === petId) {
            newPet.status = newStatus;
            newPet.careGiver = currentUser.uid
            dispatch(setSelectedPet(newPet)); }
          return newPet
        })
        dispatch(setPets(newPets))
        dispatch(updateUserPets(res.data.userPets))
        dispatch(setPetsInUserCare(res.data.petsInUserCare))
        dispatch(setLoadingFalse())
      } catch (error) {
        handleApiError(error)
      }
    }, [api_url, currentUser, dispatch, handleApiError,  pets])


  const returnPet = useCallback(async (petId) => {
    try {
      dispatch(startApiCall())
      const res = await axiosAuthCall.post(api_url + `/pet/${petId}/return`);
      ////add pet  uid and status to pet
      const newPets = pets.map((currentPet) => {
        const newPet = {...currentPet}
        if(currentPet._id === petId) {
          newPet.status = PET_STATUS.available;
          newPet.careGiver = null
          dispatch(setSelectedPet(newPet)); }
        return newPet
      })
      dispatch(setPets(newPets))
      dispatch(setPetsInUserCare(res.data.petsInUserCare))
      dispatch(updateUserPets(res.data.userPets))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  } , [api_url, dispatch, handleApiError, pets])
  

  const savePet = useCallback(async (petId) => {
    try {
      //dispatch(startApiCall())
      dispatch(updateUserSavedPets([...new Set([...currentUser.userSavedPets, petId])]))
      const res = await axiosAuthCall.post(api_url + `/pet/${petId}/save`);
      dispatch(updateUserSavedPets(res.data.userSavedPets))
      dispatch(setPetsSavedByUser(res.data.petsSavedByUser))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }, [api_url, dispatch, handleApiError, currentUser?.userSavedPets])


  const unSavePet = useCallback(async (petId) => {
    try {
      //dispatch(startApiCall())
      dispatch(updateUserSavedPets(
        currentUser.userSavedPets.filter(pet =>  pet !== petId)
      ))

      const res = await axiosAuthCall.delete(api_url + `/pet/${petId}/save`);
      dispatch(updateUserSavedPets(res.data.userSavedPets))
      dispatch(setPetsSavedByUser(res.data.petsSavedByUser))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }, [api_url, dispatch, handleApiError, currentUser?.userSavedPets])


  const adoptPet = useCallback( (petId) => {
    takeCareOfPet(petId, PET_STATUS.adopted)
  }, [takeCareOfPet])


  const fosterPet = useCallback((petId) => {
    takeCareOfPet(petId, PET_STATUS.fostered)
  }, [takeCareOfPet])

  
  return (
    { login, checkAuth, logout, signIn, updateUser, getPets, 
      getPetByID, setSelectedPetByID, adoptPet, fosterPet, 
        returnPet, savePet, unSavePet,
      uploadAppPic, addPetToDb, updatePetInDb, deletePetFromDb}
  )
}
