import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ExchangeRates = {
  [currency: string]: number; // e.g., { USD: 0.012, EUR: 0.011 }
};

export const useExchangeRates = () => {
  return useQuery<ExchangeRates>({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      const res = await axios.get('https://open.er-api.com/v6/latest/INR'); // or any similar free API
      return res.data.rates;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
