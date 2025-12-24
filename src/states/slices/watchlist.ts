import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchlistState {
  movies: MovieDetail[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<MovieDetail>) => {
      if (!state.movies.find(m => m.id === action.payload.id)) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
