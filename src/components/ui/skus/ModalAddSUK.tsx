import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface ModalAddSUKProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  editingSku: boolean;
  skuName: string;
  setSkuName: (value: string) => void;
  skuPrice: number;
  setSkuPrice: Dispatch<SetStateAction<string>>;
  skuCost: number;
  setSkuCost: Dispatch<SetStateAction<string>>;
  skuClass: string;
  setSkuClass: (value: string) => void;
  skuDepartment: string;
  setSkuDepartment: (value: string) => void;
  errors: {
    name: boolean;
    price: boolean;
    cost: boolean;
  };
  setErrors: (errors: { name: boolean; price: boolean; cost: boolean }) => void;
  handleSaveSku: () => void;
}

export default function ModalAddSUK({
  openDialog,
  handleCloseDialog,
  editingSku,
  skuName,
  setSkuName,
  skuPrice,
  setSkuPrice,
  skuCost,
  setSkuCost,
  skuClass,
  setSkuClass,
  skuDepartment,
  setSkuDepartment,
  errors,
  handleSaveSku,
}: ModalAddSUKProps) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{editingSku ? 'Edit SKU' : 'Add New SKU'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='SKU Name'
          type='text'
          fullWidth
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
          error={errors.name}
          helperText={errors.name ? 'Name is required' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          margin='dense'
          id='price'
          label='Price'
          type='number'
          fullWidth
          value={skuPrice}
          onChange={(e) => setSkuPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          error={errors.price}
          helperText={errors.price ? 'Price must be a valid number' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          margin='dense'
          id='cost'
          label='Cost'
          type='number'
          fullWidth
          value={skuCost}
          onChange={(e) => setSkuCost(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          error={errors.cost}
          helperText={errors.cost ? 'Cost must be a valid number' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          margin='dense'
          id='class'
          label='Class'
          type='text'
          fullWidth
          value={skuClass}
          onChange={(e) => setSkuClass(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin='dense'
          id='department'
          label='Department'
          type='text'
          fullWidth
          value={skuDepartment}
          onChange={(e) => setSkuDepartment(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSaveSku} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
