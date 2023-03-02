import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import modalSlice from './reducers/modalSlice'


export default configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice
  },
})
