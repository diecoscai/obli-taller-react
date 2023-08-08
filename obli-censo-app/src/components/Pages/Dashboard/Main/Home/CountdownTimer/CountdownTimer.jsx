import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

const CountdownTimer = () => {
  const targetDate = new Date('2023-08-31');
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  }

  const boxStyle = {
    width: '8%',
    height: '100px',
    margin: '5px',
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0px 0px 10px #2c3d5e',
    borderRadius: '50px',
    padding:'0px'
  };

  const typographyStyle = {
    color: '#2c3d5e',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div>
      <Typography variant="h5" style={typographyStyle}>
        Tiempo restante para el 31 de Agosto
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={0} style={boxStyle}>
          <h3>Dias</h3>
          <p>{timeRemaining.days}</p>
        </Paper>
        <Paper elevation={0} style={boxStyle}>
          <h3>Horas</h3>
          <p>{timeRemaining.hours}</p>
        </Paper>
        <Paper elevation={0} style={boxStyle}>
          <h3>Minutos</h3>
          <p>{timeRemaining.minutes}</p>
        </Paper>
      </Box>
    </div>
  );
};

export default CountdownTimer;
