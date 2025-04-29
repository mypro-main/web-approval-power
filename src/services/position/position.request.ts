import { BaseParams } from '../shared/base.params';

export interface GetAllPositionParams extends BaseParams {
  id?: string;
  name?: string;
  status?: string;
}

export interface AssignPositionRequest {
  name: string;
  description?: string;
  status: string;
}
