import { useQuery } from '@tanstack/react-query'; // ✅ Use @tanstack/react-query if v5
import axios from 'axios';

type MonthlySummary = {
  totalConsumption: number;
  totalCost: number;
};

export const useMonthlySummary = () => {
  return useQuery({
    queryKey: ['monthlySummary'],
    queryFn: async () => {
      const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/oi');
      return {
        totalConsumption: res.data.data.totalConsumption,
        totalCost: res.data.data.totalCost,
      };
    },
  });
};
