import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Widget {
  id: string;
  type: 'passwordGenerator' | 'recentActivity' | 'strengthChart' | 'categoryChart';
  position: { x: number; y: number };
  visible: boolean;
}

interface DashboardState {
  widgets: Widget[];
  addWidget: (type: Widget['type']) => void;
  removeWidget: (id: string) => void;
  updateWidgetPosition: (id: string, position: { x: number; y: number }) => void;
  toggleWidgetVisibility: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: [],
      addWidget: (type) =>
        set((state) => ({
          widgets: [
            ...state.widgets,
            {
              id: `${type}-${Date.now()}`,
              type,
              position: { x: 0, y: 0 },
              visible: true,
            },
          ],
        })),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),
      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, position } : widget
          ),
        })),
      toggleWidgetVisibility: (id) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, visible: !widget.visible } : widget
          ),
        })),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);