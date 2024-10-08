
import { createSlice } from '@reduxjs/toolkit';

// const profilePictures=["assets/images/f1.png", 
//   "assets/images/f2.png", 
//   "assets/images/f3.png", 
//   "assets/images/f4.png", 
//   "assets/images/f5.png", 
//   "assets/images/f6.png", 
//   "assets/images/f7.png", 
//   "assets/images/f8.png", 
//   "assets/images/f9.png"];


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
        //const pic=`assets/images/img${Math.floor(Math.random() * 18) + 1}.png`;
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
     // post reducers
     addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        postId: Date.now(),
        isShow:true,
        likes: [],
        comments: []
      };
      state.posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },

    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        const alreadyLiked = post.likes.includes(userId);
        if (!alreadyLiked) {
          post.likes.push(userId); // like
        } else {
          post.likes = post.likes.filter(id => id !== userId); // toggole like
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },

    addComment: (state, action) => {
      const { userId,postId, commentText } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        const newComment = {
          commentId: Date.now(),
          userId,
          commentText,
          likes: [],
          replies: [],
        };
        post.comments.push(newComment);
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },

    likeComment: (state, action) => {
      const { commentId,postId, userId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      const comment = post.comments.find(comment => comment.commentId === commentId);
      if (comment) {
        const alreadyLiked = comment.likes.includes(userId);
        if (!alreadyLiked) {
          comment.likes.push(userId); // like
        } else {
          comment.likes = comment.likes.filter(id => id !== userId); // toggole like
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    addReply: (state, action) => {
      const { postId, commentId, userId, replyText } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        const comment = post.comments.find(comment => comment.commentId === commentId);
        if (comment) {
          const newReply = {
            replyId: Date.now(),
            userId,
            replyText,
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
  likeComment,
  addReply,
  loadPosts, } = authSlice.actions;
export default authSlice.reducer;
