import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminsCocktail } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchAdminsCocktail = createAsyncThunk<AdminsCocktail[], void, { state: RootState }>(
  'admins/fetchAdminsCocktails',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    const { data: cocktails } = await axiosApi.get('/admins', { headers: { Authorization: `Bearer ${token}` } });
    return cocktails;
  },
);
export const deleteAdminCocktail = createAsyncThunk<void, string, { state: RootState }>(
  'admins/deleteAdminCocktail',
  async (cocktailId, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/admins/${cocktailId}`, { headers: { Authorization: `Bearer ${token}` } });
  },
);
export const publishAdminCocktail = createAsyncThunk<void, string, { state: RootState }>(
  'admins/publishCocktail',
  async (cocktailId, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/admins/${cocktailId}/togglePublished`, true, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
);
