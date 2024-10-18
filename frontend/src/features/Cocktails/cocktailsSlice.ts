import { Cocktail } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, fetchCocktails, fetchOneCocktail } from './cocktailsThunks.ts';

interface CocktailsState {
  cocktails: Cocktail[];
  cocktailsFetching: boolean;
  oneCocktail: Cocktail | null;
  oneCocktailFetching: boolean;
  cocktailCreating: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  cocktailsFetching: false,
  oneCocktail: null,
  oneCocktailFetching: false,
  cocktailCreating: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.cocktailsFetching = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.cocktails = cocktails;
        state.cocktailsFetching = false;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.cocktailsFetching = false;
      });
    builder
      .addCase(fetchOneCocktail.pending, (state) => {
        state.oneCocktailFetching = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.oneCocktail = cocktail;
        state.oneCocktailFetching = false;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.oneCocktailFetching = false;
      });
    builder
      .addCase(createCocktail.pending, (state) => {
        state.cocktailCreating = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.cocktailCreating = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.cocktailCreating = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectCocktailsFetching: (state) => state.cocktailsFetching,
    selectOneCocktail: (state) => state.oneCocktail,
    selectOneCocktailFetching: (state) => state.oneCocktailFetching,
    selectCocktailCreating: (state) => state.cocktailCreating,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
  selectCocktails,
  selectCocktailsFetching,
  selectOneCocktailFetching,
  selectOneCocktail,
  selectCocktailCreating,
} = cocktailsSlice.selectors;
