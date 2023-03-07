import { configureStore } from '@reduxjs/toolkit'
import appSlice from './reducers/appSlice'
import authSlice from './reducers/authSlice'
import userSlice from './reducers/userSlice'


export default configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    user: userSlice
  },
})
