
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('users')) || [],
  posts: JSON.parse(localStorage.getItem('posts')) || [],
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const user = state.users.find(user => user.email === action.payload.email);
      if (user) {
        alert('User already exists');
      }
      else {
        state.users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
      
    },

    login: (state, action) => {
      const user = state.users.find(user => user.email === action.payload.email && user.password === action.payload.password);
      if (user) {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      else {
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
      const posts = JSON.parse(localStorage.getItem('posts'));
      if (posts) {
        state.posts = posts;
      }
    },
     // Post-related reducers
     addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        id: Date.now(),
        likes: [],
        comments: []
      };
      state.posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },

    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const alreadyLiked = post.likes.includes(userId);
        if (!alreadyLiked) {
          post.likes.push(userId);
        } else {
          post.likes = post.likes.filter(id => id !== userId); // Unlike if already liked
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },

    addComment: (state, action) => {
      const { postId, userId, text } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const newComment = {
          id: Date.now(),
          userId,
          text,
          replies: [],
        };
        post.comments.push(newComment);
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },

    addReply: (state, action) => {
      const { postId, commentId, userId, text } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const comment = post.comments.find(comment => comment.id === commentId);
        if (comment) {
          const newReply = {
            id: Date.now(),
            userId,
            text,
          };
          comment.replies.push(newReply);
          localStorage.setItem('posts', JSON.stringify(state.posts));
        }
      }
    },

    loadPosts: (state) => {
      const posts = JSON.parse(localStorage.getItem('posts'));
      if (posts) {
        state.posts = posts;
      }
    },
  },
});


export const {   register,
  login,
  logout,
  loadUsers,
  addPost,
  likePost,
  addComment,
  addReply,
  loadPosts, } = authSlice.actions;
export default authSlice.reducer;
