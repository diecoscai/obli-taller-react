import React, { useState } from 'react';
import { Alert } from '@mui/material';

const CustomAlert = ({ message, color }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <Alert severity={color} onClose={handleClose}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default CustomAlert;
