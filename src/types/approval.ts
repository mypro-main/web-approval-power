export interface IApprovalTableFilters {
  name: string;
  status: string;
}

export interface IApprovalItem {
  id: string;
  name: string;
  status: IApprovalStatus;
}

export enum IApprovalStatus {
  active = 'active',
  inactive = 'inactive',
}
