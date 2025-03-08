import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function ChartWithSelectorData() {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const { weeks } = useSelector((state: RootState) => state.calendar);
  const planningData = useSelector((state: RootState) => state.planning.planningData);

  const [selectedStoreId, setSelectedStoreId] = useState<string>('');

  // Create chart data for the selected store
  const chartData = useMemo(() => {
    if (!selectedStoreId || weeks.length === 0 || skus.length === 0) {
      return [];
    }

    return weeks.map((week) => {
      const weekEntries = planningData.filter(
        (entry) => entry.storeId === selectedStoreId && entry.weekId === week.id,
      );

      let totalSalesDollars = 0;
      let totalGmDollars = 0;

      weekEntries.forEach((entry) => {
        const sku = skus.find((s) => s.id === entry.skuId);
        if (sku) {
          const salesUnits = entry.salesUnits;
          const salesDollars = salesUnits * sku.price;
          const costDollars = salesUnits * sku.cost;
          const gmDollars = salesDollars - costDollars;

          totalSalesDollars += salesDollars;
          totalGmDollars += gmDollars;
        }
      });

      const gmPercentage = totalSalesDollars > 0 ? (totalGmDollars / totalSalesDollars) * 100 : 0;

      return {
        week: week.name,
        gmDollars: totalGmDollars,
        gmPercentage,
      };
    });
  }, [selectedStoreId, weeks, skus, planningData]);

  const handleStoreChange = (event: SelectChangeEvent) => {
    setSelectedStoreId(event.target.value);
  };

  // Find the selected store name
  const selectedStoreName = useMemo(() => {
    if (!selectedStoreId) return '';
    const store = stores.find((s) => s.id === selectedStoreId);
    return store ? store.label : '';
  }, [selectedStoreId, stores]);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id='store-select-label'>Select Store</InputLabel>
        <Select
          labelId='store-select-label'
          id='store-select'
          value={selectedStoreId}
          label='Select Store'
          onChange={handleStoreChange}
        >
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStoreId ? (
        <>
          <Typography variant='h6' gutterBottom>
            Performance for {selectedStoreName}
          </Typography>
          <ResponsiveContainer width='100%' height={500}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='week' />
              <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
              <YAxis
                yAxisId='right'
                orientation='right'
                stroke='#82ca9d'
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (typeof value !== 'number') return [value, name];
                  if (name === 'GM Dollars') {
                    return [`$${value.toFixed(2)}`, name];
                  }
                  return [`${value.toFixed(2)}%`, name];
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='gmDollars' name='GM Dollars' fill='#8884d8' />
              <Bar yAxisId='right' dataKey='gmPercentage' name='GM %' fill='#82ca9d' />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Typography variant='body1' align='center' sx={{ py: 10 }}>
          Please select a store to view performance data
        </Typography>
      )}
    </Paper>
  );
}
