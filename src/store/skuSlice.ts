import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from '../models/types';

interface SkuState {
  skus: SKU[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SkuState = {
  skus: [],
  status: 'idle',
  error: null,
};

export const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSku: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    updateSku: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    removeSku: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
});

export const { addSku, updateSku, removeSku } = skuSlice.actions;
export default skuSlice.reducer;
