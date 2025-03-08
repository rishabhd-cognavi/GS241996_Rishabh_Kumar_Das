import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningData } from '../models/types';

interface PlanningState {
  planningData: PlanningData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlanningState = {
  planningData: [],
  status: 'idle',
  error: null,
};

export const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updateSalesUnit: (state, action: PayloadAction<PlanningData>) => {
      const { storeId, skuId, weekId, salesUnits } = action.payload;
      const existingIndex = state.planningData.findIndex(
        (item) => item.storeId === storeId && item.skuId === skuId && item.weekId === weekId,
      );

      if (existingIndex !== -1) {
        state.planningData[existingIndex].salesUnits = salesUnits;
      } else {
        state.planningData.push(action.payload);
      }
    },
    bulkUpdatePlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      state.planningData = action.payload;
    },
  },
});

export const { updateSalesUnit, bulkUpdatePlanningData } = planningSlice.actions;
export default planningSlice.reducer;
