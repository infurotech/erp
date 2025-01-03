export type NotificationInfo = {
  userId?: string;
  notificationType: 'email' | 'whatsapp';
  payload: any;
  priority?: NotificationPriority;
}

export enum NotificationPriority {
  CRITICAL_UPDATE = 1,
  IMPORTANT = 2,
  GENERAL = 3,
  LOW_PRIORITY = 4,
  BULK_PROCESS = 5,
}
