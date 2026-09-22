import { notifications, type NotificationData } from "@mantine/notifications";

export const appNotification = {
  success: (message: string, options?: Partial<NotificationData>) => {
    return notifications.show({
      title: "Muvaffaqiyatli",
      message,
      color: "green",
      ...options,
    });
  },

  error: (message: string, options?: Partial<NotificationData>) => {
    return notifications.show({
      title: "Xatolik",
      message,
      color: "red",
      ...options,
    });
  },
};
