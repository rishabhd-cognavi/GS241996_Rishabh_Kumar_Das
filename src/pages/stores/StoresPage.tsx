import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '../../models/types';
import { addStore, updateStore, removeStore } from '../../store/storeSlice';
import TableForStore from '../../components/ui/store/TableForStore';
import ModalAddStore from '../../components/ui/store/ModalAddStore';

const StoresPage: React.FC = () => {
  const dispatch = useDispatch();

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

      <TableForStore onEdit={handleOpenDialog} onDelete={handleDeleteStore} />

      <ModalAddStore
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        editingStore={editingStore}
        storeLabel={storeLabel}
        setStoreLabel={setStoreLabel}
        storeCity={storeCity}
        setStoreCity={setStoreCity}
        storeState={storeState}
        setStoreState={setStoreState}
        handleSaveStore={handleSaveStore}
      />
    </Box>
  );
};

export default StoresPage;
