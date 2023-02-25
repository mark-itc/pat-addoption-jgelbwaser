import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  startApiCall, setTokensState, setLogoutState, setLoginState,
  setErrorState, clearErrorState
} from '../redux/reducers/authSlice';
import { axiosJWT, axiosInstance, refreshToken, accessToken } from '../lib/axios'


export default function UseApi() {


  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const api_url = process.env.REACT_APP_API_URL

  const handleApiError = (error) => {
    const errorMsg = error.response?.data?.error || error.message;
    console.log(error);
    dispatch(setErrorState(errorMsg))
  }


  const login = async ({ email, password }) => {
    dispatch(startApiCall())
    console.log('login called');
    try {
      const res = await axiosInstance.post(api_url + "/login", { email, password });
      const {accessToken, refreshToken, currentUser} = res.data
      dispatch(setLoginState({accessToken, refreshToken, currentUser}))
      console.log('res', res.data)
    } catch (error) {
      dispatch(setLogoutState());
      handleApiError(error)
    }
  }


  return (
    { login }
  )
}
