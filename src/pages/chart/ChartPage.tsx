import React from 'react';
import { Box, Typography } from '@mui/material';
import ChartWithSelectorData from '../../components/ui/chart/ChartWithSelectorData';

const ChartPage: React.FC = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 120px)', width: '100%', p: 2 }}>
      <Typography variant='h4' gutterBottom>
        Store Performance Chart
      </Typography>

      <ChartWithSelectorData />
    </Box>
  );
};

export default ChartPage;
