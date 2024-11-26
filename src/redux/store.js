import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import uploadJsonReducer from './uploadJsonSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        uploadJson: uploadJsonReducer
    }
})