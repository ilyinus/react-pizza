export enum NotificationType {
  ALERT = 'alert',
  INFO = 'info'
}

export interface NotificationItem {
  type: NotificationType
  message: string
}

export interface NotificationsState extends NotificationItem {
  shown: boolean
}
