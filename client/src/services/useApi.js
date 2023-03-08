import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout, setLogin } from '../redux/reducers/authSlice';
import { startApiCall, setAppError, setLoadingFalse } from '../redux/reducers/appSlice';
import { axiosAuthCall, axiosCall } from '../lib/axios'
import { clearCurrentUser, setCurrentUser } from '../redux/reducers/userSlice';
import { setPets, setSelectedPet } from '../redux/reducers/petSlice';


export default function UseApi() {

  const { currentUser } = useSelector(state => state.user)
  const { filters } = useSelector(state => state.pet)
  const dispatch = useDispatch();
  const api_url = process.env.REACT_APP_API_URL




  const login = async ({ email, password }) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/login", { email, password });
      const { accessToken, refreshToken, currentUser } = res.data
      dispatch(setLogin({ accessToken, refreshToken }))
      dispatch(setCurrentUser(currentUser))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }


  const logout = useCallback(() => {
    dispatch(setLogout());
    dispatch(clearCurrentUser());
  }, [dispatch])

  const handleApiError = useCallback((error) => {
    if (error.response?.data?.logOut === true) {
      logout();
    }
    const errorMsg = error.response?.data?.error || error.message;
    dispatch(setAppError(errorMsg))
    console.log(error);
  }, [dispatch, logout])


  const signIn = async (newUserData) => {
    try {
      dispatch(startApiCall())
      const res = await axiosCall.post(api_url + "/register", newUserData);
      const { accessToken, refreshToken, currentUser } = res.data
      dispatch(setLogin({ accessToken, refreshToken }))
      dispatch(setCurrentUser(currentUser))
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
      handleApiError(error)
    }
  }, [filters, api_url, handleApiError, dispatch])


  const getPetByID = async (id) => {
    try {
      dispatch(startApiCall())
      const res = await axiosCall.get(api_url + "/pet/" + id);
      console.log(api_url + "/pet/" + id)
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
        data = dataWithoutPasswords
      }
      const res = await axiosAuthCall.post(api_url + `/user/${uid}`, data);
      const updatedCurrentUser = res.data.currentUser
      console.log('res.data', res.data)
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
      console.log('checkAuth tokenDecoded', res.data)
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    { login, checkAuth, logout, signIn, updateUser, getPets, getPetByID, setSelectedPetByID }
  )
}
