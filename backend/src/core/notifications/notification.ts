export type NotificationJob = {
    userId: string;
    notificationType: 'email' | 'push' | 'sms' | 'slack' | 'teams';
    payload: any; // Message, recipient details, etc.
};