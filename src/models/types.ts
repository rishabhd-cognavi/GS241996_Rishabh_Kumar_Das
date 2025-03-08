export interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}

export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
  class: string;
  department: string;
}

export interface PlanningData {
  storeId: string;
  skuId: string;
  weekId: string;
  salesUnits: number;
}

export interface Week {
  id: string;
  name: string;
  monthId: string;
}

export interface Month {
  id: string;
  name: string;
}
