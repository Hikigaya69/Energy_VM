export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface VirtualMeter {
  id: string;
  name: string;
  location: string;
  type: 'electricity' | 'solar' | 'gas' | 'water';
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  readings: Reading[];
  thresholds: Threshold[];
  lastReading?: Reading;
  efficiency?: number;
  cost?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface Reading {
  timestamp: Date;
  value: number;
  unit: string;
}

export interface Threshold {
  id: string;
  type: 'min' | 'max';
  value: number;
  unit: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  meterId?: string;
}

export interface DashboardStats {
  totalConsumption: number;
  totalCost: number;
  averageEfficiency: number;
  activeMeters: number;
  alerts: number;
  savingsThisMonth: number;
}

export interface EnergyData {
  period: string;
  consumption: number;
  cost: number;
  efficiency: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'summary' | 'analysis' | 'optimization' | 'compliance';
  schedule: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastGenerated: string;
  status: 'completed' | 'generating' | 'failed' | 'scheduled';
  size?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar: string;
  permissions: string[];
}