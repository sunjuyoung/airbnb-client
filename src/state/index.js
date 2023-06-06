import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  favorites: [],
  s3: "https://syseoz610-airbnb-test.s3.ap-northeast-2.amazonaws.com/listing-images",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.favorites = action.payload.favorites || [];
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    addFavorite: (state, action) => {
      state.favorites.push(action.payload.listingId);
    },

    deleteFavorite: (state, action) => {
      const deleteFavorite = state.favorites.filter((fav) => {
        if (fav !== action.payload.listingId) return action.payload.listingId;
      });
      state.favorites = deleteFavorite;
    },
  },
});

export const { setLogin, setLogout, addFavorite, deleteFavorite } =
  authSlice.actions;
export default authSlice.reducer;
