import React from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { loadSampleData } from '../../store/dataActions';
import { AppDispatch } from '../../store';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLoadSampleData = () => {
    dispatch(loadSampleData());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1, top: 0, left: 0 }}>
        <Navbar />
      </Box>
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Box
          sx={{
            position: 'fixed',
            height: 'calc(100vh - 64px)',
            zIndex: 1,
            top: '64px',
            left: 0,
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            minWidth: 0,
            ml: '240px', // Adjust this value based on Sidebar width
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' onClick={handleLoadSampleData}>
              Load Sample Data
            </Button>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
