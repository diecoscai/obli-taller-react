import React from 'react';
import { Grid } from '@mui/material';
import Charts from './Charts';

const Home = () => {
    return (
        <div>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: '80%',
                    margin: 'auto',
                    marginTop: '10vh',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}>
                <Grid item xs={12}>
                    <Charts />
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
