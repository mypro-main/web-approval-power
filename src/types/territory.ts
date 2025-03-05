import { IRegionItem } from './region';

export interface ITerritoryTableFilters {
  id: string;
  name: string;
  status: string;
  regionId: string;
}

export interface ITerritoryItem {
  id: string;
  Region: Pick<IRegionItem, 'id' | 'name'>;
  name: string;
  description: string;
  status: ITerritoryStatus;
}

export enum ITerritoryStatus {
  active = 'active',
  inactive = 'inactive',
}
