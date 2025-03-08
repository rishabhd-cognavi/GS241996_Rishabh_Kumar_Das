import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  // In a real app, this would come from auth state
  const isAuthenticated = false;

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box display='flex' alignItems='center' flexGrow={1}>
          <img
            src='/src/assets/GSynergyLogo.svg'
            alt='GSynergy Logo'
            style={{ marginRight: '16px', height: '50px', background: 'white' }}
          />
          <Typography variant='h6'>Data Viewer</Typography>
        </Box>
        {isAuthenticated ? (
          <Button color='inherit'>Sign Out</Button>
        ) : (
          <Button color='inherit'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
