import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';
import { GetAllApprovalParams } from './approval.request';
import { ApprovalResponse } from './approval.response';
import { IApprovalStatus } from '../../types/approval';

export class ApprovalService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllApprovalParams): Promise<BaseResponse<ApprovalResponse[]>> {
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

    // const response = await this.api.get(`/approval?${query}`);

    console.log('XX', MOCK_RESPONSE);

    return MOCK_RESPONSE;

    // return response.data;
  }
}

const MOCK_RESPONSE = {
  data: [
    { id: '123456', name: 'MOCK 1', status: 'active' as IApprovalStatus },
    { id: '654321', name: 'MOCK 2', status: 'active' as IApprovalStatus },
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
