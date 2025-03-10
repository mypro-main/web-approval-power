import { BaseParams } from '../shared/base.params';

export interface GetAllApprovalParams extends BaseParams {
  name?: string;
  status?: string;
}
