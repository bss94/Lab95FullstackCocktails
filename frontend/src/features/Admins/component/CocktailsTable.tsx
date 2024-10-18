import { AdminsCocktail, Rate } from '../../../types.ts';
import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  Alert,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
  cocktails: AdminsCocktail[];
  deleting: string | false;
  publishing: string | false;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

const CocktailsTable: React.FC<Props> = ({ cocktails, deleting, publishing, onDelete, onPublish }) => {
  const totalRate = (rate: Rate[]) => {
    if (rate.length > 0) {
      return (
        rate.reduce((acc, cur) => {
          return acc + cur.rate;
        }, 0) / rate.length
      );
    } else return 0;
  };

  return (
    <Grid container spacing={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead color="primary">
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">isPublished</StyledTableCell>
              <StyledTableCell align="right">Recipe</StyledTableCell>
              <StyledTableCell align="right">Ingredients</StyledTableCell>
              <StyledTableCell align="right">Rate</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cocktails.map((cocktail) => (
              <StyledTableRow key={cocktail._id}>
                <StyledTableCell component="th" scope="row">
                  {cocktail.title}
                </StyledTableCell>
                <StyledTableCell align="right">{cocktail.author.email}</StyledTableCell>
                <StyledTableCell align="right">{cocktail.image}</StyledTableCell>
                <StyledTableCell align="right" sx={{ color: cocktail.isPublished ? 'inherit' : 'red' }}>
                  {cocktail.isPublished ? 'Public' : 'Unpublished'}
                </StyledTableCell>
                <StyledTableCell align="left">{cocktail.recipe}</StyledTableCell>
                <StyledTableCell align="left">
                  {cocktail.ingredients.map((ingredient) => {
                    return <div key={ingredient._id}>{ingredient.ingredientName}</div>;
                  })}
                </StyledTableCell>
                <StyledTableCell align="left">{totalRate(cocktail.rate)}</StyledTableCell>
                <StyledTableCell align="right">
                  {!cocktail.isPublished && (
                    <LoadingButton
                      loading={publishing === cocktail._id}
                      loadingPosition="center"
                      variant="outlined"
                      color="success"
                      onClick={() => onPublish(cocktail._id)}
                      sx={{ me: 1 }}
                    >
                      <PublishIcon />
                    </LoadingButton>
                  )}
                  <LoadingButton
                    loading={deleting === cocktail._id}
                    loadingPosition="center"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(cocktail._id)}
                  >
                    <DeleteIcon />
                  </LoadingButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {cocktails.length === 0 && <Alert severity="info">Cocktails empty</Alert>}
    </Grid>
  );
};

export default CocktailsTable;
