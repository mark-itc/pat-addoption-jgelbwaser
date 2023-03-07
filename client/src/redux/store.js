import { configureStore } from '@reduxjs/toolkit'
import appSlice from './reducers/appSlice'
import authSlice from './reducers/authSlice'
//import modalSlice from './reducers/modalSlice'


export default configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice
  },
})
