import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import Grid from '@mui/material/Grid2';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import { Typography } from '@mui/material';
import CocktailsList from './components/CocktailsList.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectCocktailsFetching } from './cocktailsSlice.ts';
import { fetchCocktails } from './cocktailsThunks.ts';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCocktailsFetching);
  const cocktails = useAppSelector(selectCocktails);
  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">
          Cocktails
        </Typography>
      </Grid>
      <LoadingSpinner loading={loading} />
      {!loading && (
        <Grid size={12}>
          {' '}
          <CocktailsList cocktails={cocktails} />
        </Grid>
      )}
    </Grid>
  );
};

export default Cocktails;
