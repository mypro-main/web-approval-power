export interface INotificationItem {
  summary: INotificationSummary;
  highlight: INotificationHighlight;
}

export interface INotificationSummary {
  requested: number;
  verified: number;
  approved: number;
  rejected: number;
}

export interface INotificationHighlight {
  requested: IHighlightItem[];
  verified: IHighlightItem[];
}

export interface IHighlightItem {
  id: string;
  name: string;
  updatedAt: string;
  outlet: {
    name: string;
  };
}
