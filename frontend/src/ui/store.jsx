import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userId: localStorage.getItem('userId'),
        carId: localStorage.getItem('carId'),
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.carId = action.payload.carId;
        },
        logout: state => {
            state.userId = null;
            state.carId = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
})