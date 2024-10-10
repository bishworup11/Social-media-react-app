// src/store/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: JSON.parse(localStorage.getItem('posts')) || [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        postId: Date.now(),
        isShow: true,
        likes: [],
        comments: [],
      };
      state.posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    hidePost: (state, action) => {
      const { postId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        post.isShow = !post.isShow;
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.postId !== action.payload.postId);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    editPost: (state, action) => {
      const { postId, text } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        post.text = text;
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      if (post) {
        const alreadyLiked = post.likes.includes(userId);
        if (!alreadyLiked) {
          post.likes.push(userId); // like
        } else {
          post.likes = post.likes.filter(id => id !== userId); // toggle like
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    addComment: (state, action) => {
      const { userId, postId, commentText } = action.payload;
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
      const { commentId, postId, userId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      const comment = post.comments.find(comment => comment.commentId === commentId);
      if (comment) {
        const alreadyLiked = comment.likes.includes(userId);
        if (!alreadyLiked) {
          comment.likes.push(userId);
        } else {
          comment.likes = comment.likes.filter(id => id !== userId);
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    addReply: (state, action) => {
      const { postId, commentId, userId, replyText } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      const comment = post.comments.find(comment => comment.commentId === commentId);
      if (comment) {
        const newReply = {
          replyId: Date.now(),
          userId,
          replyText,
          likes: [],
        };
        comment.replies.push(newReply);
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    likeReply: (state, action) => {
      const { commentId, postId, userId, replyId } = action.payload;
      const post = state.posts.find(post => post.postId === postId);
      const comment = post.comments.find(comment => comment.commentId === commentId);
      const reply = comment.replies.find(reply => reply.replyId === replyId);
      if (reply) {
        const alreadyLiked = reply.likes.includes(userId);
        if (!alreadyLiked) {
          reply.likes.push(userId);
        } else {
          reply.likes = reply.likes.filter(id => id !== userId);
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
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

export const { 
  addPost, 
  hidePost, 
  deletePost, 
  editPost, 
  likePost, 
  addComment, 
  likeComment, 
  addReply, 
  likeReply, 
  loadPosts 
} = postSlice.actions;

export default postSlice.reducer;
