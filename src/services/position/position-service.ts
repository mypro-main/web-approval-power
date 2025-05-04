import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import {
  AssignPositionRequest,
  CreatePositionRequest,
  GetAllPositionParams,
} from './position.request';
import { stringify } from 'qs';
import { PositionResponse } from './position.response';

export class PositionService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllPositionParams): Promise<BaseResponse<PositionResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        id: params?.id || '',
        name: params?.name || '',
        status: params?.status || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    return MOCK;

    const response = await this.api.get(`/position?${query}`);
    return response.data;
  }

  async create(payload: CreatePositionRequest): Promise<void> {
    const response = await this.api.post(`/position`, payload);
    return response.data;
  }

  async assign(id: string, payload: AssignPositionRequest): Promise<PositionResponse | null> {
    const response = await this.api.put(`/position/${id}`, payload);
    return response.data;
  }
}

const MOCK = {
  data: [
    {
      id: '12345',
      name: 'Jr Manager',
      role: 'SAM',
      status: 'active',
    },
    {
      id: '12346',
      name: 'Sr Manager',
      role: 'SAM',
      status: 'active',
    },
    {
      id: '12347',
      name: 'Manager',
      role: null,
      status: 'active',
    },
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
