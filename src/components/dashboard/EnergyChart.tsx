


import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

type RawTagValue = {
  tagId: string;
  time: Date;
  value: number;
};

type TagSummary = {
  sum: number;
  count: number;
};

type AggregatedDataPoint = {
  time: string;
  supply: number;
  supplyB: number;
  loss: number;
  field1: number;
  field2: number;
  field3: number;
  field4: number;
  field5: number;
};

const getBucketSizeFromRange = (start: string, end: string): number => {
  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  const diffMinutes = diffMs / 60000;
  if (diffMinutes <= 60) return 5;
  if (diffMinutes <= 1440) return 60;
  return 360;
};

const getBucket = (timestamp: string, bucketSize: number): string => {
  const date = new Date(timestamp);
  const minutes = date.getMinutes();
  const roundedMinutes = Math.floor(minutes / bucketSize) * bucketSize;
  date.setMinutes(roundedMinutes, 0, 0);
  return date.toISOString();
};

export const EnergyChartECharts = () => {
  const [energyData, setEnergyData] = useState<AggregatedDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState('2025-06-22T00:00');
  const [endTime, setEndTime] = useState('2025-06-24T23:59');
  const [preset, setPreset] = useState('30min');

  const average = (obj?: TagSummary): number =>
    obj ? parseFloat((obj.sum / obj.count).toFixed(2)) : 0;

const toISOStringLocal = (d: Date) => {
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};


  const handlePresetChange = (value: string) => {
    setPreset(value);

    const now = new Date();
    let start: Date;

    switch (value) {
      case '30min':
        start = new Date(now.getTime() - 30 * 60 * 1000);
        break;
      case '1hr':
        start = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '1day':
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7day':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
      default:
        return; // Do nothing for custom
    }

    setStartTime(toISOStringLocal(start));
    setEndTime(toISOStringLocal(now));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const bucketSize = getBucketSizeFromRange(startTime, endTime);

      const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/currenttagvalues', {
        params: { startTime, endTime },
      });

      const raw: RawTagValue[] = res.data.data.map((item: any) => ({
        tagId: item.tagId,
        time: new Date(item.time),
        value: Number(item.tagValue),
      }));

      const buckets: Record<string, Record<string, TagSummary>> = {};
      raw.forEach(({ tagId, time, value }) => {
        const bucket = getBucket(time.toISOString(), bucketSize);
        if (!buckets[bucket]) buckets[bucket] = {};
        if (!buckets[bucket][tagId]) {
          buckets[bucket][tagId] = { sum: value, count: 1 };
        } else {
          buckets[bucket][tagId].sum += value;
          buckets[bucket][tagId].count++;
        }
      });

      const finalData: AggregatedDataPoint[] = Object.entries(buckets).map(
        ([bucket, tags]) => ({
          time: bucket,
          supply: average(tags['Tags.Node_A']),
          supplyB: average(tags['Tags.Node_B']),
          loss: average(tags['Faults.TotalLoss']),
          field1: average(tags['Tags.Field_1']),
          field2: average(tags['Tags.Field_2']),
          field3: average(tags['Tags.Field_3']),
          field4: average(tags['Tags.Field_4']),
          field5: average(tags['Tags.Field_5']),
        })
      );

      setEnergyData(finalData);
    } catch (err) {
      console.error('Error fetching energy data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 50000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const categories = energyData.map((point) => point.time);
  const seriesKeys = [
    { key: 'supply', name: 'Node A' },
    { key: 'supplyB', name: 'Node B' },
    { key: 'loss', name: 'Total Loss' },
    { key: 'field1', name: 'Field 1' },
    { key: 'field2', name: 'Field 2' },
    { key: 'field3', name: 'Field 3' },
    { key: 'field4', name: 'Field 4' },
    { key: 'field5', name: 'Field 5' },
  ];

  const customColors = [
    '#10b981', '#3b82f6', '#ef4444',
    '#8b5cf6', '#f59e0b', '#ec4899',
    '#14b8a6', '#a855f7',
  ];

  const option = {
    color: customColors,
    tooltip: { trigger: 'axis' },
    legend: {
      data: seriesKeys.map((s) => s.name),
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
    },
    yAxis: { type: 'value' },
    series: seriesKeys.map((s) => ({
      name: s.name,
      type: 'line',
      data: energyData.map((d) => d[s.key as keyof AggregatedDataPoint]),
    })),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Trend ({preset === 'custom' ? 'Custom Range' : preset})</CardTitle>
        <div className="mt-2 flex gap-4 flex-wrap items-center text-white">
          <div className="flex gap-2 items-center text-white">
            <label htmlFor="preset">Range:</label>
            <select
              id="preset"
              className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1"
              value={preset}
              onChange={(e) => handlePresetChange(e.target.value)}
            >
              <option value="30min">Last 30 Min</option>
              <option value="1hr">Last 1 Hour</option>
              <option value="1day">Last 1 Day</option>
              <option value="7day">Last 7 Days</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {preset === 'custom' && (
            <>
              <div className="flex items-center gap-2">
                <label htmlFor="start">Start:</label>
                <input
                  id="start"
                  type="datetime-local"
                  className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="end">End:</label>
                <input
                  id="end"
                  type="datetime-local"
                  className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : !energyData.length ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <ReactECharts option={option} style={{ height: 400, width: '100%' }} />
        )}
      </CardContent>
    </Card>
  );
};
