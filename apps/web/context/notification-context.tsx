import { createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export const NotificationContext = createContext<ReturnType<typeof useNotificationStore> | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
