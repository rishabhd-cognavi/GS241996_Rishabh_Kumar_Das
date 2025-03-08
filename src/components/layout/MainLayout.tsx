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
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            minWidth: 0,
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
