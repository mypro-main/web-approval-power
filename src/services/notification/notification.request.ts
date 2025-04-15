export interface GetAllNotificationParams {
  page: number;
  category: string;
  isRead: boolean;
}

export interface ReadNotificationRequest {
  id: string;
  isRequestedType: boolean;
}

export interface ReadAllNotificationRequest {
  ids: string[];
  isRequestedType: boolean;
}
