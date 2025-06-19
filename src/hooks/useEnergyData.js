import { useQuery } from '@tanstack/react-query';

// Mock data for demonstration
const mockMeters = [
  {
    id: '1',
    name: 'Main Building',
    location: 'Building A - Floor 1',
    type: 'electricity',
    status: 'active',
    readings: [],
    thresholds: [],
    lastReading: {
      timestamp: new Date(),
      value: 1250,
      unit: 'kWh',
    },
    efficiency: 87,
    cost: 187.50,
    trend: 'down',
  },
  {
    id: '2',
    name: 'Solar Panel Array',
    location: 'Rooftop - South Wing',
    type: 'solar',
    status: 'active',
    readings: [],
    thresholds: [],
    lastReading: {
      timestamp: new Date(),
      value: 850,
      unit: 'kWh',
    },
    efficiency: 92,
    cost: -127.50,
    trend: 'up',
  },
  {
    id: '3',
    name: 'HVAC System',
    location: 'Building A - Mechanical Room',
    type: 'electricity',
    status: 'maintenance',
    readings: [],
    thresholds: [],
    lastReading: {
      timestamp: new Date(),
      value: 980,
      unit: 'kWh',
    },
    efficiency: 73,
    cost: 147.00,
    trend: 'stable',
  },
];

const mockStats = {
  totalConsumption: 2230,
  totalCost: 207.00,
  averageEfficiency: 84,
  activeMeters: 2,
  alerts: 3,
  savingsThisMonth: 342.50,
};

const mockAlerts = [
  {
    id: '1',
    type: 'warning',
    title: 'High Consumption Alert',
    message: 'HVAC System consumption is 15% above normal',
    timestamp: new Date(),
    read: false,
    meterId: '3',
  },
  {
    id: '2',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Solar Panel Array maintenance scheduled for tomorrow',
    timestamp: new Date(),
    read: false,
    meterId: '2',
  },
  {
    id: '3',
    type: 'error',
    title: 'Meter Offline',
    message: 'Water meter in Building B is not responding',
    timestamp: new Date(),
    read: true,
  },
];

const generateMockEnergyData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate more realistic data with some variation
    const baseConsumption = 800 + Math.sin(i * 0.2) * 200;
    const baseCost = 120 + Math.sin(i * 0.15) * 50;
    
    data.push({
      period: date.toISOString().split('T')[0],
      consumption: Math.floor(baseConsumption + (Math.random() - 0.5) * 100),
      cost: Math.floor(baseCost + (Math.random() - 0.5) * 30),
      efficiency: Math.floor(75 + Math.random() * 20),
    });
  }
  
  return data;
};

export const useVirtualMeters = () => {
  return useQuery({
    queryKey: ['virtualMeters'],
    queryFn: () => Promise.resolve(mockMeters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => Promise.resolve(mockStats),
    refetchInterval: 30 * 1000, // 30 seconds
  });
};

export const useEnergyData = (period = '30d') => {
  return useQuery({
    queryKey: ['energyData', period],
    queryFn: () => {
      const data = generateMockEnergyData();
      console.log('Generated energy data:', data);
      return Promise.resolve(data);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => Promise.resolve(mockAlerts),
    refetchInterval: 60 * 1000, // 1 minute
  });
};