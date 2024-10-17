import React from 'react';
import Grid from '@mui/material/Grid2';
import {CircularProgress} from '@mui/material';

interface Props{
  loading: boolean;
}

const LoadingSpinner:React.FC<Props> = ({loading}) => {
  return loading && (
    <Grid size={12} sx={{textAlign: 'center'}}>
      <CircularProgress color="warning"/>
    </Grid>
  );
};

export default LoadingSpinner;