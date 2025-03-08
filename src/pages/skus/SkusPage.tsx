import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { SKU } from '../../models/types';
import { addSku, updateSku, removeSku } from '../../store/skuSlice';
import TableForSKU from '../../components/ui/skus/TableForSKU';
import ModalAddSUK from '../../components/ui/skus/ModalAddSUK';

const generateSkuId = () => {
  const randomNumbers = Math.floor(10000 + Math.random() * 90000);
  return `SK${randomNumbers}`;
};

const SkusPage: React.FC = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSku, setEditingSku] = useState<SKU | null>(null);
  const [skuName, setSkuName] = useState('');
  const [skuPrice, setSkuPrice] = useState('');
  const [skuCost, setSkuCost] = useState('');
  const [skuClass, setSkuClass] = useState('');
  const [skuDepartment, setSkuDepartment] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    cost: false,
  });

  const resetForm = () => {
    setSkuName('');
    setSkuPrice('');
    setSkuCost('');
    setSkuClass('');
    setSkuDepartment('');
    setErrors({
      name: false,
      price: false,
      cost: false,
    });
  };

  const handleOpenDialog = (sku?: SKU) => {
    resetForm();

    if (sku) {
      setEditingSku(sku);
      setSkuName(sku.name);
      setSkuPrice(sku.price.toString());
      setSkuCost(sku.cost.toString());
      setSkuClass(sku.class);
      setSkuDepartment(sku.department);
    } else {
      setEditingSku(null);
    }

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSku(null);
    resetForm();
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: skuName.trim() === '',
      price: isNaN(Number(skuPrice)) || Number(skuPrice) < 0,
      cost: isNaN(Number(skuCost)) || Number(skuCost) < 0,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSaveSku = () => {
    if (!validateForm()) return;

    const price = Number(skuPrice);
    const cost = Number(skuCost);

    if (editingSku) {
      dispatch(
        updateSku({
          ...editingSku,
          name: skuName,
          price,
          cost,
          class: skuClass,
          department: skuDepartment,
        }),
      );
    } else {
      dispatch(
        addSku({
          id: generateSkuId(),
          name: skuName,
          price,
          cost,
          class: skuClass,
          department: skuDepartment,
        }),
      );
    }

    handleCloseDialog();
  };

  const handleDeleteSku = (id: string) => {
    dispatch(removeSku(id));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>SKUs</Typography>
        <Button variant='contained' startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add SKU
        </Button>
      </Box>

      <TableForSKU handleOpenDialog={handleOpenDialog} handleDeleteSku={handleDeleteSku} />

      <ModalAddSUK
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        editingSku={!!editingSku}
        skuName={skuName}
        setSkuName={setSkuName}
        skuPrice={Number(skuPrice)}
        setSkuPrice={setSkuPrice}
        skuCost={Number(skuCost)}
        setSkuCost={setSkuCost}
        skuClass={skuClass}
        setSkuClass={setSkuClass}
        skuDepartment={skuDepartment}
        setSkuDepartment={setSkuDepartment}
        errors={errors}
        setErrors={setErrors}
        handleSaveSku={handleSaveSku}
      />
    </Box>
  );
};

export default SkusPage;
