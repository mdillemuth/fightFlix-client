import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'userFavorites',
  initialState: {
    favorites: [],
  },
  reducers: {},
});

export const { favoriteAdded, favoriteRemoved } = slice.actions;
export default slice.reducer;
