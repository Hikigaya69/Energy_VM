import { create } from 'zustand';

// Define alert type
export type Alert = {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: number;
  tagId: string;
  read?: boolean;
};

// Define the Zustand store shape
type AlertStore = {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  markAsRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  clearAllAlerts: () => void;
};

// Create the Zustand store
export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],

  addAlert: (newAlert) =>
    set((state) => {
      const exists = state.alerts.some(
        (a) =>
          a.tagId === newAlert.tagId &&
          a.type === newAlert.type &&
          a.message === newAlert.message &&
          !a.read
      );

      if (exists) return state; // Do not add duplicate unread alert

      return {
        alerts: [...state.alerts, newAlert],
      };
    }),

  markAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, read: true } : a
      ),
    })),

  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  clearAllAlerts: () => set({ alerts: [] }),
}));
