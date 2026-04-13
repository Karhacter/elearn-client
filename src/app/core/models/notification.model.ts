export interface NotificationResponse {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    actionUrl?: string;
    createdAt?: Date;
}

export interface NotificationSummaryResponse {
    totalCount: number;
    unreadCount: number;
}
