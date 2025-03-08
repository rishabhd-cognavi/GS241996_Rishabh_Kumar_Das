import { AppDispatch } from './index';
import { generateSampleData } from '../utils/sampleData';
import { reorderStores } from './storeSlice';
import { addSku } from './skuSlice';
import { setCalendarData } from './calendarSlice';
import { bulkUpdatePlanningData } from './planningSlice';

export const loadSampleData = () => (dispatch: AppDispatch) => {
  const sampleData = generateSampleData();

  // Load stores
  dispatch(reorderStores(sampleData.stores));

  // Load SKUs (one by one to avoid race conditions)
  sampleData.skus.forEach((sku) => {
    dispatch(addSku(sku));
  });

  // Load calendar data
  dispatch(
    setCalendarData({
      weeks: sampleData.weeks,
      months: sampleData.months,
    }),
  );

  // Load planning data
  dispatch(bulkUpdatePlanningData(sampleData.planningData));
};
