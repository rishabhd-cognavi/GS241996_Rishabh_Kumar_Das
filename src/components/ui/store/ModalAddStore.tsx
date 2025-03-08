import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Store } from '../../../models/types';

interface ModalAddStoreProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  editingStore: Store | null;
  storeLabel: string;
  setStoreLabel: (value: string) => void;
  storeCity: string;
  setStoreCity: (value: string) => void;
  storeState: string;
  setStoreState: (value: string) => void;
  handleSaveStore: () => void;
}

const AddStoreModal = ({
  openDialog,
  handleCloseDialog,
  editingStore,
  storeLabel,
  setStoreLabel,
  storeCity,
  setStoreCity,
  storeState,
  setStoreState,
  handleSaveStore,
}: ModalAddStoreProps) => {
  return (
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
  );
};

export default AddStoreModal;
