import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  alerts: Alert[];  // Add alerts array
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  
  // Notification Methods
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  
  // Preference Methods
  updatePreferences: (preferences: Partial<NotificationStore['preferences']>) => void;

  // Alert Methods
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  markAlertAsRead: (id: string) => void;
  removeAlert: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set) => ({
      notifications: [],
      alerts: [],  // Initialize alerts array
      preferences: {
        emailNotifications: true,
        pushNotifications: true
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              read: false
            }
          ]
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          )
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        })),

      clearAll: () =>
        set({ notifications: [] }),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              read: false
            }
          ]
        })),

      markAlertAsRead: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, read: true } : a
          )
        })),

      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id)
        })),
    })
  )
);
