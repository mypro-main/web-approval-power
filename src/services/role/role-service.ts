import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';
import { GetAllRoleParams } from './role.request';
import { RoleResponse } from './role.response';
import { IRoleStatus } from '../../types/role';

export class RoleService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllRoleParams): Promise<BaseResponse<RoleResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        name: params?.name || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    // const response = await this.api.get(`/role?${query}`);

    console.log('XX', MOCK_RESPONSE);

    return MOCK_RESPONSE;

    // return response.data;
  }
}

const MOCK_RESPONSE = {
  data: [
    { id: '123456', name: 'MOCK 1', status: 'active' as IRoleStatus },
    { id: '654321', name: 'MOCK 2', status: 'active' as IRoleStatus },
  ],
  meta: {
    record: {
      current: 1,
      total: 1,
    },
    page: {
      current: 1,
      total: 1,
    },
  },
};
