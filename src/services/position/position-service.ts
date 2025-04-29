import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { AssignPositionRequest, GetAllPositionParams } from './position.request';
import { stringify } from 'qs';
import { PositionResponse } from './position.response';

export class PositionService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllPositionParams): Promise<BaseResponse<any[]>> {
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

    const response = await this.api.get(`/position?${query}`);
    return response.data;
  }

  async assign(id: string, payload: AssignPositionRequest): Promise<PositionResponse | null> {
    const response = await this.api.put(`/position/${id}`, payload);
    return response.data;
  }
}
