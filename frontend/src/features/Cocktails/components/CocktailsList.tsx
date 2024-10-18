import React from 'react';
import { Cocktail } from '../../../types.ts';
import Grid from '@mui/material/Grid2';
import { Alert, Grow, Paper } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';

interface Props {
  cocktails: Cocktail[];
}

const CocktailsList: React.FC<Props> = ({ cocktails }) => {
  return (
    <Grid container spacing={2}>
      {cocktails.length > 0 ? (
        cocktails.map((cocktail, index) => (
          <Grid size={3} key={cocktail._id}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: index * 500 }}>
              <Paper elevation={4}>
                <CocktailItem cocktail={cocktail} />
              </Paper>
            </Grow>
          </Grid>
        ))
      ) : (
        <Alert severity="info">Cocktails not found!</Alert>
      )}
    </Grid>
  );
};

export default CocktailsList;
