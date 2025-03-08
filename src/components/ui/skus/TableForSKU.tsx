import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SKU } from '../../../models/types';

interface TableForSKUProps {
  handleOpenDialog: (sku: SKU) => void;
  handleDeleteSku: (id: string) => void;
}

export default function TableForSKU({ handleOpenDialog, handleDeleteSku }: TableForSKUProps) {
  const skus = useSelector((state: RootState) => state.skus.skus);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Cost</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skus.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align='center'>
                No SKUs added yet. Add your first SKU!
              </TableCell>
            </TableRow>
          ) : (
            skus.map((sku) => (
              <TableRow key={sku.id}>
                <TableCell>{sku.name}</TableCell>
                <TableCell align='right'>{formatCurrency(sku.price)}</TableCell>
                <TableCell align='right'>{formatCurrency(sku.cost)}</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label='edit' onClick={() => handleOpenDialog(sku)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label='delete' onClick={() => handleDeleteSku(sku.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
