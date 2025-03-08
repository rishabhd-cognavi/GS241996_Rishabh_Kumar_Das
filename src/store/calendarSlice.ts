import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Week, Month } from '../models/types';

interface CalendarState {
  weeks: Week[];
  months: Month[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CalendarState = {
  weeks: [],
  months: [],
  status: 'idle',
  error: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendarData: (state, action: PayloadAction<{ weeks: Week[]; months: Month[] }>) => {
      state.weeks = action.payload.weeks;
      state.months = action.payload.months;
    },
  },
});

export const { setCalendarData } = calendarSlice.actions;
export default calendarSlice.reducer;
