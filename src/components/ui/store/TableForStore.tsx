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
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../../store';
import { Store } from '../../../models/types';

export default function TableForStore({
  onEdit,
  onDelete,
}: {
  onEdit: (store: Store) => void;
  onDelete: (storeId: string) => void;
}) {
  const stores = useSelector((state: RootState) => state.stores.stores);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
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
            stores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell>{store.label}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.state}</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label='edit' onClick={() => onEdit(store)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label='delete' onClick={() => onDelete(store.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 30, 50]}
        component='div'
        count={stores.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
