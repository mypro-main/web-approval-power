import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';
import { ActivityResponse } from './activity.response';
import { GetAllActivityParams } from './activity.request';

export class ActivityService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllActivityParams): Promise<BaseResponse<ActivityResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        startDate: params?.startDate || '',
        endDate: params?.endDate || '',
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
    {
      id: '123456',
      name: 'Super Admin has verified and confirmed approval for the @mockuser1 registration',
      date: new Date(),
    },
    {
      id: '654321',
      name: 'Super Admin has verified and confirmed approval for the @mockuser2 registration',
      date: new Date(),
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
