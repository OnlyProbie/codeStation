import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false, // 是否登录
        userInfo: {} // 从服务端拿到的用户信息，如积分等
    },
    reducers: {
        initUserInfo: (state, { payload }) => {
            state.userInfo = payload
        }
    }
})

export const { initUserInfo } = userSlice.actions

export default userSlice.reducer