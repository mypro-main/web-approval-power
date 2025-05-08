import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { User } from './auth.response';

export class AuthService {
  api: AxiosInstance = axiosInstance;

  async getAccount(): Promise<User> {
    const { data } = await this.api.get<User>('auth/account');

    const role = data.Position.role;

    return {
      ...data,
      role,
    };
  }
}
