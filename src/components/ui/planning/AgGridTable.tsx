import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ICellRendererParams,
  ModuleRegistry,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCalendar } from '../../../store/calendarActions';
import { updateSalesUnit } from '../../../store/planningSlice';
import { AppDispatch, RootState } from '../../../store';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridTable() {
  const dispatch = useDispatch<AppDispatch>();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const { weeks, months } = useSelector((state: RootState) => state.calendar);
  const planningData = useSelector((state: RootState) => state.planning.planningData);

  // Initialize calendar data if not present
  useEffect(() => {
    if (weeks.length === 0) {
      dispatch(initializeCalendar());
    }
  }, [dispatch, weeks.length]);

  // Create row data for the grid
  const rowData = useMemo(() => {
    if (stores.length === 0 || skus.length === 0) {
      return [];
    }

    return stores.flatMap((store) =>
      skus.map((sku) => ({
        storeId: store.id,
        storeName: store.label,
        skuId: sku.id,
        skuName: sku.name,
        price: sku.price,
        cost: sku.cost,
      })),
    );
  }, [stores, skus]);

  // Format currency
  const currencyFormatter = (params: ValueFormatterParams) => {
    return params.value !== undefined
      ? params.value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      : '$0.00';
  };

  // Create column definitions
  const generateColumns = () => {
    // Static columns for store and SKU
    const staticCols: ColDef[] = [
      {
        field: 'storeName',
        headerName: 'Store',
        pinned: 'left',
        width: 200,
      },
      {
        field: 'skuName',
        headerName: 'SKU',
        pinned: 'left',
        width: 250,
      },
    ];

    // Generate dynamic columns for each week
    const weekCols: ColDef[] = [];

    // If we have months and weeks data, group by months
    if (months.length > 0 && weeks.length > 0) {
      months.forEach((month) => {
        const monthWeeks = weeks.filter((week) => week.monthId === month.id);

        const monthGroup: ColGroupDef = {
          headerName: month.name,
          children: monthWeeks.map((week) => ({
            headerName: week.name,
            children: [
              {
                field: `salesUnits_${week.id}`,
                headerName: 'Sales Units',
                editable: true,
                width: 120,
                valueGetter: (params) => {
                  const storeId = params.data?.storeId;
                  const skuId = params.data?.skuId;
                  const entry = planningData.find(
                    (item) =>
                      item?.storeId === storeId &&
                      item?.skuId === skuId &&
                      item?.weekId === week?.id,
                  );
                  return entry ? entry.salesUnits : 0;
                },
                valueSetter: (params) => {
                  const newValue = params?.newValue !== '' ? Number(params?.newValue) : 0;
                  if (isNaN(newValue)) return false;

                  dispatch(
                    updateSalesUnit({
                      storeId: params.data.storeId,
                      skuId: params.data.skuId,
                      weekId: week.id,
                      salesUnits: newValue,
                    }),
                  );
                  return true;
                },
              },
              {
                field: `salesDollars_${week.id}`,
                headerName: 'Sales Dollars',
                width: 140,
                valueGetter: (params: ValueGetterParams) => {
                  const storeId = params.data?.storeId;
                  const skuId = params.data?.skuId;
                  const price = params.data?.price || 0;
                  const entry = planningData.find(
                    (item) =>
                      item.storeId === storeId && item.skuId === skuId && item.weekId === week.id,
                  );
                  const units = entry ? entry.salesUnits : 0;
                  return units * price;
                },
                valueFormatter: currencyFormatter,
              },
              {
                field: `gmDollars_${week.id}`,
                headerName: 'GM Dollars',
                width: 140,
                valueGetter: (params: ValueGetterParams) => {
                  const storeId = params.data?.storeId;
                  const skuId = params.data?.skuId;
                  const price = params.data?.price || 0;
                  const cost = params.data?.cost || 0;
                  const entry = planningData.find(
                    (item) =>
                      item.storeId === storeId && item.skuId === skuId && item.weekId === week.id,
                  );
                  const units = entry ? entry.salesUnits : 0;
                  const salesDollars = units * price;
                  const costDollars = units * cost;
                  return salesDollars - costDollars;
                },
                valueFormatter: currencyFormatter,
              },
              {
                field: `gmPercent_${week.id}`,
                headerName: 'GM %',
                width: 120,
                valueGetter: (params: ValueGetterParams) => {
                  const storeId = params.data?.storeId;
                  const skuId = params.data?.skuId;
                  const price = params.data?.price || 0;
                  const cost = params.data?.cost || 0;
                  const entry = planningData.find(
                    (item) =>
                      item.storeId === storeId && item.skuId === skuId && item.weekId === week.id,
                  );
                  const units = entry ? entry.salesUnits : 0;
                  const salesDollars = units * price;
                  const costDollars = units * cost;
                  const gmDollars = salesDollars - costDollars;

                  return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
                },
                cellRenderer: GmPercentRenderer,
              },
            ],
          })),
        };

        weekCols.push(monthGroup);
      });
    }

    return [...staticCols, ...weekCols];
  };

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: true,
      minWidth: 100,
    };
  }, []);

  return (
    <div className='ag-theme-material' style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={generateColumns()}
        defaultColDef={defaultColDef}
        animateRows={true}
      />
    </div>
  );
}

const GmPercentRenderer = (props: ICellRendererParams) => {
  const value = props.value;
  let backgroundColor = 'white';
  let textColor = 'black';

  if (value >= 40) {
    backgroundColor = '#4CAF50';
    textColor = 'white';
  } else if (value >= 10) {
    backgroundColor = '#FFEB3B';
    textColor = 'black';
  } else if (value > 5) {
    backgroundColor = '#FF9800';
    textColor = 'white';
  } else if (value <= 5) {
    backgroundColor = '#F44336';
    textColor = 'white';
  }

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        padding: '5px',
        borderRadius: '3px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value.toFixed(2)}%
    </div>
  );
};
