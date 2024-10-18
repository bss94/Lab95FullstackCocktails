import { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectAdminCocktails,
  selectAdminFetchCocktail,
  selectDeletingCocktail,
  selectPatchCocktail,
} from './adminsSlice.ts';
import { deleteAdminCocktail, fetchAdminsCocktail, publishAdminCocktail } from './adminsThunks.ts';
import { Typography } from '@mui/material';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import CocktailsTable from './component/CocktailsTable.tsx';

const Admins = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectAdminCocktails);
  const loading = useAppSelector(selectAdminFetchCocktail);
  const deleting = useAppSelector(selectDeletingCocktail);
  const publishing = useAppSelector(selectPatchCocktail);

  useEffect(() => {
    dispatch(fetchAdminsCocktail());
  }, [dispatch]);
  const onDelete = async (id: string) => {
    await dispatch(deleteAdminCocktail(id));
    dispatch(fetchAdminsCocktail());
  };
  const onPublish = async (id: string) => {
    await dispatch(publishAdminCocktail(id));
    dispatch(fetchAdminsCocktail());
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h6" sx={{ my: 2 }}>
          Cocktails Admins Table
        </Typography>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <CocktailsTable
            cocktails={cocktails}
            deleting={deleting}
            publishing={publishing}
            onDelete={onDelete}
            onPublish={onPublish}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Admins;
