// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  users: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    login: (state, action) => {
      const user = state.users.find(user => user.email === action.payload.email && user.password === action.payload.password);
      if (user) {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    loadUsers: (state) => {
      const users = JSON.parse(localStorage.getItem('users'));
      if (users) {
        state.users = users;
      }
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        state.currentUser = currentUser;
      }
    },
  },
});


export const { register, login, logout, loadUsers } = authSlice.actions;
export default authSlice.reducer;
