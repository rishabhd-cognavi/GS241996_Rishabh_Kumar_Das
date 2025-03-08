import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../models/types';

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore(state, action: PayloadAction<Store>) {
      state.stores.push(action.payload);
    },
    updateStore(state, action: PayloadAction<Store>) {
      const index = state.stores.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    removeStore(state, action: PayloadAction<string>) {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    reorderStores(state, action: PayloadAction<Store[]>) {
      state.stores = action.payload;
    },
  },
});

export const { addStore, updateStore, removeStore, reorderStores } = storeSlice.actions;
export default storeSlice.reducer;
