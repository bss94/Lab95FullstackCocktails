import { AdminsCocktail } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { deleteAdminCocktail, fetchAdminsCocktail, publishAdminCocktail } from './adminsThunks.ts';

interface AdminState {
  cocktails: AdminsCocktail[];
  fetchCocktails: boolean;
  deletingCocktail: string | false;
  patchCocktail: string | false;
}

const initialState: AdminState = {
  cocktails: [],
  fetchCocktails: false,
  deletingCocktail: false,
  patchCocktail: false,
};

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminsCocktail.pending, (state) => {
        state.fetchCocktails = true;
      })
      .addCase(fetchAdminsCocktail.fulfilled, (state, { payload: cocktails }) => {
        state.cocktails = cocktails;
        state.fetchCocktails = false;
      })
      .addCase(fetchAdminsCocktail.rejected, (state) => {
        state.fetchCocktails = false;
      });
    builder
      .addCase(deleteAdminCocktail.pending, (state, { meta: { arg: id } }) => {
        state.deletingCocktail = id;
      })
      .addCase(deleteAdminCocktail.fulfilled, (state) => {
        state.deletingCocktail = false;
      })
      .addCase(deleteAdminCocktail.rejected, (state) => {
        state.deletingCocktail = false;
      });
    builder
      .addCase(publishAdminCocktail.pending, (state, { meta: { arg: id } }) => {
        state.patchCocktail = id;
      })
      .addCase(publishAdminCocktail.fulfilled, (state) => {
        state.patchCocktail = false;
      })
      .addCase(publishAdminCocktail.rejected, (state) => {
        state.patchCocktail = false;
      });
  },
  selectors: {
    selectAdminCocktails: (state) => state.cocktails,
    selectAdminFetchCocktail: (state) => state.fetchCocktails,
    selectDeletingCocktail: (state) => state.deletingCocktail,
    selectPatchCocktail: (state) => state.patchCocktail,
  },
});

export const adminsReducer = adminsSlice.reducer;
export const { selectAdminCocktails, selectPatchCocktail, selectDeletingCocktail, selectAdminFetchCocktail } =
  adminsSlice.selectors;
