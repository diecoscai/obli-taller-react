import React from 'react';
import { Grid } from '@mui/material';
import Charts from './Charts';
const Home = () => {
  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: '80%',
          maxHeight: '100%',
          margin: 'auto',
          marginTop: '10vh',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
        <Charts />
      </Grid>
    </div>
  );
};

export default Home;
