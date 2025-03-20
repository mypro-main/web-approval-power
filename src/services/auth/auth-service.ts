import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';

export class AuthService {
  api: AxiosInstance = axiosInstance;

  async getAccount(): Promise<Record<string, any> | null> {
    const response = await this.api.get('auth/account');
    return response.data.user;
  }
}
