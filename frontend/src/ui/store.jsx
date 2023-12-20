import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userId: Cookies.get('userId') || null,
        carId: Cookies.get('carId') || null,
        session: Cookies.get('session') || null,
        // userId: localStorage.getItem('userId') || null,
        // carId: localStorage.getItem('carId') || null,
        // session: localStorage.getItem('session') || null,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.carId = action.payload.carId;
            state.session = action.payload.session;
            Cookies.set('userId', action.payload.userId);
            Cookies.set('carId', action.payload.carId);
            Cookies.set('session', action.payload.session);
            // localStorage.setItem('userId', action.payload.userId);
            // localStorage.setItem('carId', action.payload.carId);
            // localStorage.setItem('session', action.payload.session);
        },
        logout: state => {
            state.userId = null;
            state.carId = null;
            state.session = null;
            Cookies.remove('userId');
            Cookies.remove('carId');
            Cookies.remove('session');
            // localStorage.removeItem('userId');
            // localStorage.removeItem('carId');
            // localStorage.removeItem('session');
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
})