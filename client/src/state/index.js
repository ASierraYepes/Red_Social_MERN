import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  UserIdCurrent: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts.reverse();
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUserId: (state, action) => {
      state.UserIdCurrent = action.payload.UserIdCurrent
    },
    setUserIdChange: (state, action) => {
      if (Array.isArray(state.UserIdCurrent)) {
        const updateUser = state.UserIdCurrent.map((userId) => {
          if (userId === action.payload.userId._id) return action.payload.userId;
          return userId;
        });
        state.UserIdCurrent = updateUser;
      }
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUserId, setUserIdChange } = authSlice.actions;
export default authSlice.reducer;
