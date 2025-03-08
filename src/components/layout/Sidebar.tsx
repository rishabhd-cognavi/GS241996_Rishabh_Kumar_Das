import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Store, Inventory, GridView, BarChart } from '@mui/icons-material';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/stores', label: 'Stores', icon: <Store /> },
  { path: '/skus', label: 'SKUs', icon: <Inventory /> },
  { path: '/planning', label: 'Planning', icon: <GridView /> },
  { path: '/chart', label: 'Chart', icon: <BarChart /> },
];

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper' }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            component={NavLink}
            to={item.path}
            key={item.path}
            sx={{
              '&.active': {
                bgcolor: 'action.selected',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: 'black' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
