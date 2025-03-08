import React from 'react';
import { Box, Typography } from '@mui/material';
import AgGridTable from '../../components/ui/planning/AgGridTable';

const PlanningPage: React.FC = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 120px)', width: '100%', p: 2 }}>
      <Typography variant='h4' gutterBottom>
        Planning
      </Typography>

      <AgGridTable />
    </Box>
  );
};

export default PlanningPage;
