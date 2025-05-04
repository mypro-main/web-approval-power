export interface IPositionTableFilters {
  name: string;
  status: string;
}

export interface IPositionItem {
  id: string;
  name: string;
  role: string | null;
  status: string;
}
