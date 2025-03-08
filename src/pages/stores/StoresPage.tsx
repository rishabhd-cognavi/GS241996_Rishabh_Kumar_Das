import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store';
import { Store } from '../../models/types';
import { addStore, updateStore, removeStore } from '../../store/storeSlice';

const StoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [storeLabel, setStoreLabel] = useState('');
  const [storeCity, setStoreCity] = useState('');
  const [storeState, setStoreState] = useState('');

  const handleOpenDialog = (store?: Store) => {
    if (store) {
      setEditingStore(store);
      setStoreLabel(store.label);
      setStoreCity(store.city);
      setStoreState(store.state);
    } else {
      setEditingStore(null);
      setStoreLabel('');
      setStoreCity('');
      setStoreState('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStore(null);
    setStoreLabel('');
    setStoreCity('');
    setStoreState('');
  };

  const handleSaveStore = () => {
    if (storeLabel.trim() === '' || storeCity.trim() === '' || storeState.trim() === '') return;

    if (editingStore) {
      dispatch(
        updateStore({
          ...editingStore,
          label: storeLabel,
          city: storeCity,
          state: storeState,
        }),
      );
    } else {
      dispatch(
        addStore({
          id: uuidv4(),
          label: storeLabel,
          city: storeCity,
          state: storeState,
        }),
      );
    }

    handleCloseDialog();
  };

  const handleDeleteStore = (id: string) => {
    dispatch(removeStore(id));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>Stores</Typography>
        <Button variant='contained' startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Store
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  No stores added yet. Add your first store!
                </TableCell>
              </TableRow>
            ) : (
              stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.id}</TableCell>
                  <TableCell>{store.label}</TableCell>
                  <TableCell>{store.city}</TableCell>
                  <TableCell>{store.state}</TableCell>
                  <TableCell align='right'>
                    <IconButton aria-label='edit' onClick={() => handleOpenDialog(store)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label='delete' onClick={() => handleDeleteStore(store.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Store Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingStore ? 'Edit Store' : 'Add New Store'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='label'
            label='Label'
            type='text'
            fullWidth
            value={storeLabel}
            onChange={(e) => setStoreLabel(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin='dense'
            id='city'
            label='City'
            type='text'
            fullWidth
            value={storeCity}
            onChange={(e) => setStoreCity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin='dense'
            id='state'
            label='State'
            type='text'
            fullWidth
            value={storeState}
            onChange={(e) => setStoreState(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveStore} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoresPage;
