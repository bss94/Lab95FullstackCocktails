import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchCocktails = createAsyncThunk<Cocktail[]>('cocktails/fetchCocktails', async () => {
  const { data: cocktails } = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktails;
});
export const fetchOneCocktail = createAsyncThunk<Cocktail, string>('cocktails/fetchOneCocktail', async (id) => {
  const { data: cocktail } = await axiosApi.get<Cocktail>(`/cocktails/${id}`);
  return cocktail;
});

export const createCocktail = createAsyncThunk<void, CocktailMutation, { state: RootState }>(
  'cocktails/create',
  async (cocktailMutation, { getState }) => {
    const token = getState().users.user?.token;
    const formData = new FormData();
    formData.append('title', cocktailMutation.title.trim());
    if (cocktailMutation.image) {
      formData.append('image', cocktailMutation.image);
    }
    formData.append('recipe', cocktailMutation.recipe.trim());
    formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));
    await axiosApi.post('/cocktails', formData, { headers: { Authorization: `Bearer ${token}` } });
  },
);
