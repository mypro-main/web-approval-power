import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { NotificationResponse } from './notification.response';

export class NotificationService {
  api: AxiosInstance = axiosInstance;

  async getSummary(): Promise<NotificationResponse> {
    const response = await this.api.get(`/notification/summary`);
    return response.data;
  }
}
