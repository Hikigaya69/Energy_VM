

import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useAlertStore } from '../store/useAlertStore'; // Update path as needed

type TimeSeriesValue = {
  time: string;
  tagValue: number;
};

type BenchmarkStats = {
  mean: number;
  stdDev: number;
  lowerThreshold: number;
  upperThreshold: number;
  values: TimeSeriesValue[];
};

const TAG_OPTIONS = [
  'Tags.Field_1',
  'Tags.Field_2',
  'Tags.Field_3',
  'Tags.Field_4',
  'Tags.Field_5',
];

const FieldBenchmarkChartWithLines: React.FC = () => {
  const [tagId, setTagId] = useState(TAG_OPTIONS[0]);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().substring(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    return d.toISOString().substring(0, 10);
  });

  const [data, setData] = useState<BenchmarkStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addAlert } = useAlertStore();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/benchmark', {
        params: { tagId, startDate, endDate },
      });

      const benchmarkData = res.data.data as BenchmarkStats;
      setData(benchmarkData);

      //  Auto-generate alert if any point > upper threshold
      const violations = benchmarkData.values.filter(
        (v) => v.tagValue > benchmarkData.upperThreshold
      );


      if (violations.length > 0) {


        addAlert({
          id: `${tagId}-${Date.now()}`,
          title: 'Threshold Breach',
          message: `${violations.length} values crossed the threshold for ${tagId}`,
          type: 'warning',
          timestamp: Date.now(),
          tagId,
        });
      }

    } catch (err) {
      console.error('Error fetching benchmark values:', err);
      setError('Failed to fetch benchmark data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tagId, startDate, endDate]);

  const option = data
    ? {
      title: {
        text: `${tagId} Benchmark with Actual Values`,
        left: 'center',
        textStyle: { color: '#fff' },
      },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Actual', 'Mean', 'Upper Threshold', 'Lower Threshold'],
        top: 30,
        textStyle: { color: '#fff' },
      },
      xAxis: {
        type: 'category',
        data: data.values.map(d =>
          new Date(d.time).toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
          })
        ),
        axisLabel: { color: '#fff', rotate: 45 },
      },
      yAxis: {
        type: 'value',
        name: 'kWh',
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
      },
      dataZoom: [
        { type: 'inside', start: 80, end: 100 },
        { type: 'slider', start: 80, end: 100 },
      ],
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: data.values.map(d => d.tagValue),
          smooth: true,
          symbol: 'circle',
          lineStyle: { color: '#60a5fa', width: 2 },
        },
        {
          name: 'Mean',
          type: 'line',
          data: data.values.map(() => data.mean),
          lineStyle: { type: 'dashed', color: '#10b981', width: 2 },
        },
        {
          name: 'Upper Threshold',
          type: 'line',
          data: data.values.map(() => data.upperThreshold),
          lineStyle: { type: 'dashed', color: '#ef4444', width: 2 },
        },
        {
          name: 'Lower Threshold',
          type: 'line',
          data: data.values.map(() => data.lowerThreshold),
          lineStyle: { type: 'dashed', color: '#f59e0b', width: 2 },
        },
      ],
    }
    : {};

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Field Benchmark Analysis</h1>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Tag</label>
          <select
            value={tagId}
            onChange={e => setTagId(e.target.value)}
            className="border rounded px-2 py-1 bg-gray-800 text-white"
          >
            {TAG_OPTIONS.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-2 py-1 bg-gray-800 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-2 py-1 bg-gray-800 text-white"
          />
        </div>
        <button
          onClick={fetchData}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-blue-400">Loading benchmark data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data && (
        <ReactECharts option={option} style={{ height: 400, width: '100%' }} />
      )}
    </div>
  );
};

export default FieldBenchmarkChartWithLines;

