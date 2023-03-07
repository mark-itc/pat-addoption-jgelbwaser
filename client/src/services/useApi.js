import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setLogout, setLogin, setUserUpdatedInfo
} from '../redux/reducers/authSlice';
import {
  startApiCall, setAppError, setLoadingFalse
} from '../redux/reducers/appSlice';
import { axiosAuthCall, axiosCall } from '../lib/axios'


export default function UseApi() {


  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const api_url = process.env.REACT_APP_API_URL

  const handleApiError = (error) => {
    if(error.response?.data?.logOut === true) {
      dispatch(setLogout());
    }
    const errorMsg = error.response?.data?.error || error.message;
    dispatch(setAppError(errorMsg))
    console.log(error);
  }

  const login = async ({ email, password }) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/login", { email, password });
      const {accessToken, refreshToken, currentUser} = res.data
      dispatch(setLogin({accessToken, refreshToken, currentUser}))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }

  const signIn = async (newUserData) => {
    dispatch(startApiCall())
    try {
      const res = await axiosCall.post(api_url + "/register", newUserData );
      const {accessToken, refreshToken, currentUser} = res.data
      dispatch(setLogin({accessToken, refreshToken, currentUser}))
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }

  const updateUser = async (newUserData) => {
    dispatch(startApiCall())
    try {
      let data = {...newUserData}
      const uid = authState.currentUser.uid

      //remove Password data from requests if they are empty
      const pwd = newUserData.password
      if(!pwd) {
        const {password, confirmPassword, ...dataWithoutPasswords} = data
        data = dataWithoutPasswords
      }
      const res = await axiosAuthCall.post(api_url + `/user/${uid}`, data );
      const {currentUser} = res.data
      dispatch(setUserUpdatedInfo(currentUser));
      dispatch(setLoadingFalse())
    } catch (error) {
      handleApiError(error)
    }
  }


  const checkAuth = async() => {
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
    { login, checkAuth, signIn, updateUser }
  )
}
