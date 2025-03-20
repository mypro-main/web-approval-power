import { BaseParams } from '../shared/base.params';

export interface GetAllApprovalParams extends BaseParams {
  keyword?: string;
  status?: string;
  requestOwnerStatus?: string;
}

export interface UpdateApprovalRequest {
  ownerId: string;
  approvalStatus: string;
  reason: string;
}
