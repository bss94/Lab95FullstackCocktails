import React, { useState } from 'react';
import { CocktailMutation } from '../../../types.ts';
import Grid from '@mui/material/Grid2';
import { IconButton, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  sending: boolean;
  onSubmit: (cocktailMutation: CocktailMutation) => void;
}

const CocktailForm: React.FC<Props> = ({ sending, onSubmit }) => {
  const [state, setState] = useState<CocktailMutation>({
    title: '',
    image: null,
    recipe: '',
    ingredients: [
      {
        ingredientName: '',
        amount: '',
      },
    ],
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onAddIngredient = () => {
    setState((prevState) => ({
      ...prevState,
      ingredients: [...state.ingredients, { ingredientName: '', amount: '' }],
    }));
  };
  const onDeleteIngredient = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((_, i) => i !== index),
    }));
  };
  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = { ...ingredientsCopy[index], [name]: value };
      return {
        ...prevState,
        ingredients: ingredientsCopy,
      };
    });
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput label="Image" name="image" required={true} onChange={fileInputChangeHandler} />
      </Grid>
      <Grid>
        <TextField
          fullWidth
          required
          multiline
          minRows={3}
          label="Recipe"
          id="recipe"
          name="recipe"
          value={state.recipe}
          onChange={inputChangeHandler}
        />
      </Grid>
      {state.ingredients.map((ingredient, index) => (
        <Grid container key={`ingredient_${index}`} alignItems="center">
          <Grid size={index > 0 ? 7 : 8}>
            <TextField
              fullWidth
              required
              label="Ingredient"
              name="ingredientName"
              value={ingredient.ingredientName}
              onChange={(event) => onIngredientChange(event, index)}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              required
              label="Amount"
              name="amount"
              value={ingredient.amount}
              onChange={(event) => onIngredientChange(event, index)}
            />
          </Grid>
          {index > 0 && (
            <Grid size={1}>
              <IconButton color="error" onClick={() => onDeleteIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
      <Grid textAlign="center">
        <IconButton size="large" color="primary" onClick={onAddIngredient}>
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid>
        <LoadingButton type="submit" loading={sending} loadingPosition="center" variant="contained">
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CocktailForm;
