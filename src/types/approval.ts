import { IOutletItem } from './outlet';

export interface IApprovalTableFilters {
  keyword: string;
  requestOwnerStatus: string;
  status: string;
}

export interface IApprovalItem {
  id: string;
  identityCardNumber: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  birthDate: string | null;
  status: IApprovalStatus | null;
  requestOwnerStatus: IApprovalRequestOwnerStatus | null;
  outletId: string;
  outlet: IOutletItem;
}

export interface IApprovalHistory {
  id: string;
  prevStatus: string;
  currentStatus: string;
  status: string;
  userId: string;
  createdAt: string;
  reason: string | null;
  User: IApprovalHistoryUser;
}

interface IApprovalHistoryUser {
  name: string;
  role: string;
}

export enum IApprovalStatus {
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  rejected = 'rejected',
}

export enum IApprovalRequestOwnerStatus {
  requested = 'requested',
  verified = 'verified',
  approved = 'approved',
  rejected = 'rejected',
}
