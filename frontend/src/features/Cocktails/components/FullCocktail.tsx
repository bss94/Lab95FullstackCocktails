import React, { useState } from 'react';
import { Cocktail, User } from '../../../types.ts';
import { Card, CardMedia, List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { API_URL } from '../../../constants.ts';

interface Props {
  cocktail: Cocktail | null;
  user: User | null;
  changeCocktailRate: (rate: number, rateId: string | undefined) => void;
}

const FullCocktail: React.FC<Props> = ({ cocktail, user, changeCocktailRate }) => {
  let totalRate = 0;
  let rateCocktail = <></>;

  if (cocktail) {
    totalRate =
      cocktail.rate.reduce((acc, cur) => {
        return acc + cur.rate;
      }, 0) / cocktail.rate.length;
    if (user && cocktail.isPublished) {
      const userRate = cocktail.rate.find((rate) => rate.user === user._id);
      const [rating, setRating] = useState<number>(userRate ? userRate.rate : 0);
      const onRateChange = (newRate: number | null) => {
        if (newRate) {
          setRating(newRate);
          changeCocktailRate(newRate, userRate?._id);
        } else {
          setRating(0);
        }
      };
      rateCocktail = (
        <Typography
          variant="body2"
          component="div"
          sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}
        >
          Rate
          <Rating
            value={rating}
            sx={{ mx: 2 }}
            disabled={!cocktail.isPublished}
            onChange={(_event, newValue) => {
              onRateChange(newValue);
            }}
          />
        </Typography>
      );
    }
  }

  return (
    cocktail && (
      <Card
        sx={{
          width: '100%',
          backgroundColor: cocktail.isPublished ? 'inherit' : 'rgba(205,141,141,0.2)',
          position: 'relative',
        }}
      >
        {!cocktail.isPublished && (
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: 'rgb(255,0,0)',
              display: 'flex',
              fontSize: 25,
              justifyContent: 'center',
              position: 'absolute',
              left: '50%',
              top: '50%',
            }}
          >
            On Moderate!
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid size={4}>
            <CardMedia sx={{ height: 370 }} image={`${API_URL}/${cocktail.image}`} title={cocktail.title} />
          </Grid>
          <Grid size={8}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                mt: 2,
                mr: 2,
              }}
            >
              Total Rating <Rating name="disabled" value={totalRate} disabled sx={{ ml: 2 }} />
            </Typography>
            <CardMedia>
              <Typography gutterBottom variant="h4" component="div" textAlign="center">
                {cocktail.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" textAlign="center">
                Ingredients:
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  bgcolor: 'background.paper',
                  m: 'auto',
                  p: 2,
                  border: `1px solid rgba(94, 88, 88, 0.3)`,
                  borderRadius: '5px',
                }}
              >
                {cocktail.ingredients.map((ingredient) => {
                  return (
                    <ListItem key={ingredient._id} secondaryAction={ingredient.amount} disablePadding>
                      <ListItemText primary={ingredient.ingredientName} />
                    </ListItem>
                  );
                })}
              </List>
            </CardMedia>
          </Grid>
          <Grid size={12} sx={{ px: 5, pb: 5 }}>
            <Typography gutterBottom variant="h6" component="div">
              Recipe:
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontSize: 16 }}>
              {cocktail.recipe}
            </Typography>

            {rateCocktail}
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default FullCocktail;
