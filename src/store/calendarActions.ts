import { AppDispatch } from './index';
import { setCalendarData } from './calendarSlice';
import { generateCalendarData } from '../utils/calendarUtils';

export const initializeCalendar = () => (dispatch: AppDispatch) => {
  // Generate calendar data for 24 weeks (about 6 months) starting from today
  const today = new Date();
  const calendarData = generateCalendarData(today, 24);
  dispatch(setCalendarData(calendarData));
};
