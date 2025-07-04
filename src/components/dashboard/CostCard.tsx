import { useState } from 'react';

import { useExchangeRates } from '../../hooks/useExchangeRates';
import { useMonthlySummary } from '../../hooks/useMonthlySummary';
import { StatsCard } from './StatsCard';

import { FaDollarSign, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const currencyOptions = [
  { code: 'INR', label: '₹ INR', icon: <FaRupeeSign className="w-6 h-6" /> },
  { code: 'USD', label: '$ USD', icon: <FaDollarSign className="w-6 h-6" /> },
  { code: 'EUR', label: '€ EUR', icon: <FaEuroSign className="w-6 h-6" /> },
  { code: 'KWD', label: 'د.ك KWD', icon: <RiMoneyDollarCircleLine className="w-6 h-6" /> },
  { code: 'AED', label: 'د.إ AED', icon: <RiMoneyDollarCircleLine className="w-6 h-6" /> },
  { code: 'SAR', label: 'ر.س SAR', icon: <RiMoneyDollarCircleLine className="w-6 h-6" /> },
];

export const CostCard = () => {
  const [currency, setCurrency] = useState('INR');
  const { data: summary } = useMonthlySummary();
  const { data: rates, isLoading: loadingRates } = useExchangeRates();

  if (!summary || !rates || loadingRates) return <p className="text-white">Loading...</p>;

  const inr = summary.totalCost;
  const conversionRate = currency === 'INR' ? 1 : rates[currency] ?? 1;
  const convertedValue = +(inr * conversionRate).toFixed(2);

  const selected = currencyOptions.find((c) => c.code === currency);

  return (
    <div className="text-white">
      <div className="mb-3 flex gap-2 items-center">
        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-white"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencyOptions.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <StatsCard
        title={`Monthly Cost (${currency})`}
        value={convertedValue}
        change={-12.5}
        trend="down"
        icon={selected?.icon ?? <FaRupeeSign className="w-6 h-6" />}
        color="success"
        format="currency"
      />
    </div>
  );
};
