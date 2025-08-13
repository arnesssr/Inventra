export interface Activity {
  id: string;
  type: 'product' | 'inventory' | 'order' | 'system';
  title: string;
  icon?: React.ReactNode;
  description: string;
  timestamp: string;
}

export interface ActivityState {
  activities: Activity[];
  getRecentActivity: () => Activity[];
}

export interface ChartDataItem {
  name: string;
  stock: number;
  value: number;
}

export interface ValueComparisonData {
  name: string;
  currentValue: number;
  previousValue: number;
  change: string;
}
