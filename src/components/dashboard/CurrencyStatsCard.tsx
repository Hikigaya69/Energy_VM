import { clsx } from 'clsx';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { JSX, useState } from 'react';
import {
    FaDollarSign,
    FaEuroSign,
    FaMoneyBillWave,
    FaRupeeSign,
} from 'react-icons/fa';
import { Card } from '../ui/Card';

interface CurrencyStatsCardProps {
    title: string;
    valueInINR: number;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
    icon: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'error';
    currencyRates: Record<string, number>;
}

const currencyIcons: Record<string, JSX.Element> = {
    INR: <FaRupeeSign className="inline w-4 h-4" />,
    USD: <FaDollarSign className="inline w-4 h-4" />,
    EUR: <FaEuroSign className="inline w-4 h-4" />,
    KWD: <FaMoneyBillWave className="inline w-4 h-4" />,
};

export const CurrencyStatsCard: React.FC<CurrencyStatsCardProps> = ({
    title,
    valueInINR,
    change,
    trend = 'stable',
    icon,
    color = 'primary',
    currencyRates,
}) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'EUR' | 'KWD'>('INR');

    const rate = selectedCurrency === 'INR' ? 1 : currencyRates?.[selectedCurrency] ?? 1;
    const convertedValue = (valueInINR * rate).toFixed(2);

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

    const iconColor = {
        primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400',
        success: 'bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400',
        warning: 'bg-warning-100 text-warning-600 dark:bg-warning-900 dark:text-warning-400',
        error: 'bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400',
    }[color];

    const trendColor = {
        up: 'text-green-600',
        down: 'text-red-600',
        stable: 'text-gray-500',
    }[trend];

    return (
        <Card className="animate-fade-in hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {title}
                        </p>
                        <select
                            className="text-xs p-1 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value as 'INR' | 'USD' | 'EUR' | 'KWD')}
                        >
                            <option value="INR">₹</option>
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="KWD">KD</option>
                        </select>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {currencyIcons[selectedCurrency]} {convertedValue}
                    </p>

                    {change !== undefined && (
                        <div className="flex items-center mt-2 text-sm">
                            <TrendIcon className={clsx('w-4 h-4 mr-1', trendColor)} />
                            <span className={clsx('font-medium', trendColor)}>
                                {Math.abs(change)}% vs last month
                            </span>
                        </div>
                    )}
                </div>

                <div className={clsx('p-3 rounded-lg', iconColor)}>
                    {icon}
                </div>
            </div>
        </Card>
    );
};
