import { v4 as uuidv4 } from 'uuid';
import { Week, Month } from '../models/types';

export const generateCalendarData = (
  startDate: Date,
  weeks: number,
): { weeks: Week[]; months: Month[] } => {
  const result: { weeks: Week[]; months: Month[] } = {
    weeks: [],
    months: [],
  };

  const monthsMap = new Map<string, Month>();

  // Create weeks
  for (let i = 0; i < weeks; i++) {
    // Calculate the date for this week
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i * 7);

    // Format the week name (e.g., "W1", "W2", etc.)
    const weekName = `W${i + 1}`;

    // Get month info
    const monthNumber = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthKey = `${year}-${monthNumber + 1}`;
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    // Create or get the month
    if (!monthsMap.has(monthKey)) {
      const month: Month = {
        id: monthKey,
        name: `${monthName} ${year}`,
      };
      monthsMap.set(monthKey, month);
      result.months.push(month);
    }

    // Create the week
    const week: Week = {
      id: uuidv4(),
      name: weekName,
      monthId: monthKey,
    };

    result.weeks.push(week);
  }

  return result;
};
