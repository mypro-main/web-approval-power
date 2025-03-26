import { IRegionItem } from './region';
import { ITerritoryItem } from './territory';

export interface IUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  jobTitle: string | null;
}

export interface IUserDetailItem extends IUserItem {
  UserTerritory: IUserTerritory[];
}

export interface IUserTableFilters {
  name: string;
  status: string;
  role: string;
}

export interface IUserRegion {
  Region: Pick<IRegionItem, 'id' | 'name'>;
}

export interface IUserTerritory {
  Territory: Pick<ITerritoryItem, 'id' | 'name'>;
}
