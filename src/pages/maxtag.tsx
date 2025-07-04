// 

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Update the import path below if your Card component is located elsewhere
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const MaxTagValuesTester: React.FC = () => {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const [startTime, setStartTime] = useState('2025-06-22T00:00');
  const [endTime, setEndTime] = useState('2025-06-24T23:59');

  const fetchMaxValues = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/maxTagValues', {
        params: { startTime, endTime },
      });
      console.log('[Peak Query Range]', startTime, '→', endTime);

      console.log(' Max tag values response:', res.data);
      setData(res.data.data);
      setLastFetched(new Date().toLocaleString());
    } catch (error) {
      console.error(' Failed to fetch max tag values:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaxValues();
    const interval = setInterval(fetchMaxValues, 8 * 60 * 1000); // Refresh every 8 minutes
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Max Tag Values (Custom Range)</CardTitle>
        <div className="mt-2 flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-white">
            <label htmlFor="start">Start:</label>
            <input
              id="start"
              type="datetime-local"
              className="text-white"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2  text-white">
            <label htmlFor="end">End:</label>
            <input
              id="end"
              type="datetime-local"
              className="text-white"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        {lastFetched && (
          <p className="text-sm text-gray-500 mt-2">Last fetched: {lastFetched}</p>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-64 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : data ? (
          <div className="bg-gray-100 dark:bg-gray-800  text-white rounded p-4">
            <ul className="space-y-1">
              {Object.entries(data).map(
                ([key, value]) =>
                  key !== 'date' && (
                    <li key={key} className="flex justify-between">
                      <span className="font-medium">{key}</span>
                      <span>{value}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MaxTagValuesTester;
