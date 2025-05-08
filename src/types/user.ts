import { IRegionItem } from './region';
import { ITerritoryItem } from './territory';
import { IPositionItem } from './position';

export interface IUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  idamanId: string | null;
  Position: IPositionItem;
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
