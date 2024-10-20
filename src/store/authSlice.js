// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('users')) || [
    {
      "userId": 1728561542994,
      "profilePicture": "assets/images/img11.png",
      "name": "Bishworup Mollik",
      "email": "b@gmail.com",
      "password": "b@gmail.com"
  },
    {
        "userId": 1728561504672,
        "profilePicture": "assets/images/img17.png",
        "name": "Alice",
        "email": "a@gmail.com",
        "password": "a@gmail.com"
    },
   
    {
      "userId": 1728561542993,
      "profilePicture": "assets/images/img4.png",
      "name": "Bob",
      "email": "bb@gmail.com",
      "password": "bb@gmail.com"
  },
    {
        "userId": 1728561631801,
        "profilePicture": "assets/images/img13.png",
        "name": "Cora",
        "email": "c@gmail.com",
        "password": "c@gmail.com"
    }
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const user = state.users.find(user => user.email === action.payload.email);
      if (user) {
        alert('Email already in use. Please use a different email.');
      } else {
        const newUser = {
          userId: Date.now(),
          profilePicture: `assets/images/img${Math.floor(Math.random() * 18) + 1}.png`,
          ...action.payload,
        };
        state.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(state.users));
        alert('User registered successfully');
      }
    },

    login: (state, action) => {
      const user = state.users.find(
        user => user.email === action.payload.email && user.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        alert('Invalid email or password');
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
