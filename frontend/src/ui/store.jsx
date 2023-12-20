import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userId: Cookies.get('userId') || null,
        carId: Cookies.get('carId') || null,
        userRole: Cookies.get('userRole') || null,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.carId = action.payload.carId;
            state.userRole = action.payload.userRole;
            Cookies.set('userId', action.payload.userId);
            Cookies.set('carId', action.payload.carId);
            Cookies.set('userRole', action.payload.userRole);
        },
        logout: state => {
            state.userId = null;
            state.carId = null;
            state.userRole = null;
            Cookies.remove('userId');
            Cookies.remove('carId');
            Cookies.remove('userRole');
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
})