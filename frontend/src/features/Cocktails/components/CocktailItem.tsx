import React from 'react';
import { Cocktail } from '../../../types.ts';
import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../constants.ts';

interface Props {
  cocktail: Cocktail;
}

const CocktailItem: React.FC<Props> = ({ cocktail }) => {
  const totalRate = cocktail.rate.reduce((acc, cur) => {
    return acc + cur.rate;
  }, 0);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={NavLink} to={`/cocktail/${cocktail._id}`}>
        <CardMedia
          component="img"
          height="280"
          image={`${API_URL}/${cocktail.image}`}
          alt="Cocktail in glass"
          sx={{}}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" textAlign="center">
            {cocktail.title}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            Rating <Rating name="disabled" value={totalRate} disabled />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CocktailItem;
