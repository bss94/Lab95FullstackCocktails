import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CocktailForm from './components/CocktailForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktailCreating } from './cocktailsSlice.ts';
import { CocktailMutation } from '../../types.ts';
import { createCocktail } from './cocktailsThunks.ts';

const NewCocktail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sending = useAppSelector(selectCocktailCreating);

  const createNewCocktail = async (cocktailMutation: CocktailMutation) => {
    try {
      await dispatch(createCocktail(cocktailMutation)).unwrap();
      navigate('/my-cocktails');
    } catch (error) {}
  };
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5" textAlign="center" sx={{ m: 2 }}>
          Create new cocktail:
        </Typography>
      </Grid>
      <Grid size={2} />
      <Grid size={8}>
        <CocktailForm sending={sending} onSubmit={createNewCocktail} />
      </Grid>
      <Grid size={2} />
    </Grid>
  );
};

export default NewCocktail;
