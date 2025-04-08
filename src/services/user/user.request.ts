import { BaseParams } from '../shared/base.params';

export interface GetAllUserParams extends BaseParams {
  name?: string;
  status?: string;
  role?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  jobTitle: string;
  territoryIds?: string[];
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role: string;
  status: string;
  jobTitle: string;
}
