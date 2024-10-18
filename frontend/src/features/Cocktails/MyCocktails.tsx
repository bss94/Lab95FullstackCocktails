import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectCocktailsFetching } from './cocktailsSlice.ts';
import { useEffect } from 'react';
import { fetchUserCocktails } from './cocktailsThunks.ts';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import CocktailsList from './components/CocktailsList.tsx';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCocktailsFetching);
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchUserCocktails());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">
          My Cocktails
        </Typography>
      </Grid>
      <LoadingSpinner loading={loading} />
      {!loading && (
        <Grid size={12}>
          <CocktailsList cocktails={cocktails} />
        </Grid>
      )}
    </Grid>
  );
};

export default MyCocktails;
