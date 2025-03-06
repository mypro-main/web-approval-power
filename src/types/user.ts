import { IRegionItem } from './region';
import { ITerritoryItem } from './territory';

export interface IUserItem {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  UserRegion: IUserRegion[];
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
