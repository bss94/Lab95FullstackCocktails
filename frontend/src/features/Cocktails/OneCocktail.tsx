import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchOneCocktail, getRateCocktail } from './cocktailsThunks.ts';
import { useParams } from 'react-router-dom';
import { selectOneCocktail, selectOneCocktailFetching } from './cocktailsSlice.ts';
import Grid from '@mui/material/Grid2';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner.tsx';
import FullCocktail from './components/FullCocktail.tsx';
import { selectUser } from '../Users/usersSlice.ts';
import { Alert } from '@mui/material';

const OneCocktail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loading = useAppSelector(selectOneCocktailFetching);
  const cocktail = useAppSelector(selectOneCocktail);
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch]);
  const changeCocktailRate = async (rate: number, rateId: string | undefined) => {
    if (cocktail) {
      await dispatch(getRateCocktail({ cocktailId: cocktail._id, rate, rateId }));
      if (id) {
        await dispatch(fetchOneCocktail(id));
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <LoadingSpinner loading={loading} />
      {!loading && <FullCocktail cocktail={cocktail} user={user} changeCocktailRate={changeCocktailRate} />}
      {!loading && !cocktail && (
        <Grid size={12}>
          <Alert severity={'info'}>Cocktail not found!</Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default OneCocktail;
