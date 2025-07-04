import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

// Types
type Mode = 'daily' | 'weekly' | 'monthly' | 'custom';

interface ConsumptionResult {
  period: string;
  tagId: string;
  totalConsumption: number;
}

const calculateCost = (units: number): number => {
  if (units <= 10000) return units * 3;
  if (units <= 30000) return 10000 * 3 + (units - 10000) * 5;
  return 10000 * 3 + 20000 * 5 + (units - 30000) * 8;
};

export const Analytics = () => {
  const [mode, setMode] = useState<Mode>('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [consumptionData, setConsumptionData] = useState<ConsumptionResult[]>([]);
  const [flowData, setFlowData] = useState<{
    totalInput: number;
    totalConsumed: number;
    loss: number;
    lossPercent: number;
    inputs: Record<string, number>;
    consumptions: Record<string, number>;
  } | null>(null);
  const [error, setError] = useState('');

  const fetchConsumptionData = async () => {
    try {
      setError('');
      const params: Record<string, string> = { mode };

      if (mode === 'custom') {
        if (!startDate || !endDate) {
          setError('Please select both start and end dates.');
          return;
        }
        params.startDate = new Date(startDate).toISOString();
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        params.endDate = end.toISOString();
      }

      const res = await axios.get<{ success: boolean; data: ConsumptionResult[] }>(
        'http://127.0.0.1:7055/oee/krbl/acquisition/fieldConsumption',
        { params }
      );
      setConsumptionData(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch energy consumption data.');
    }
  };

  const fetchFlowData = async () => {
    if (!startDate || !endDate) return;
    try {
      const res = await axios.get<{ success: boolean; data: any }>(
        'http://127.0.0.1:7055/oee/krbl/acquisition/sankey',
        {
          params: {
            start: new Date(startDate).toISOString(),
            end: new Date(endDate).toISOString()
          }
        }
      );
      setFlowData(res.data.data);
    } catch (err) {
      console.error('Flow summary fetch error', err);
    }
  };

  useEffect(() => {
    fetchConsumptionData();
    if (mode === 'custom') {
      fetchFlowData();
    } else {
      setFlowData(null); // hide sankey if not in custom mode
    }
  }, [mode, startDate, endDate]);

  const tagIds = Array.from(new Set(consumptionData.map((d) => d.tagId)));

  const barOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: tagIds.map(tag => tag.replace('Tags.', 'Field ')),
      axisLabel: { rotate: 30, fontSize: 12 }
    },
    yAxis: { type: 'value', name: 'Consumption' },
    series: [
      {
        name: 'Total Consumption',
        type: 'bar',
        barWidth: '60%',
        data: tagIds.map(tag =>
          consumptionData.filter(d => d.tagId === tag).reduce((sum, d) => sum + d.totalConsumption, 0)
        ),
        showBackground: true,
        backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }
      }
    ]
  };

  const comparisonOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Consumption', 'Cost'],
      textStyle: { color: '#ffffff' }
    },
    xAxis: {
      type: 'category',
      data: tagIds.map(tag => tag.replace('Tags.', 'Field ')),
      axisLabel: { rotate: 30 }
    },
    yAxis: [
      { type: 'value', name: 'Consumption' },
      { type: 'value', name: 'Cost (₹)' }
    ],
    series: [
      {
        name: 'Consumption',
        type: 'bar',
        yAxisIndex: 0,
        data: tagIds.map(tag =>
          consumptionData.filter(d => d.tagId === tag).reduce((sum, d) => sum + d.totalConsumption, 0)
        )
      },
      {
        name: 'Cost',
        type: 'bar',
        yAxisIndex: 1,
        data: tagIds.map(tag => {
          const units = consumptionData
            .filter(d => d.tagId === tag)
            .reduce((sum, d) => sum + d.totalConsumption, 0);
          return calculateCost(units);
        })
      }
    ]
  };

  const sankeyOption = flowData
    ? (() => {
        type SankeyNode = { name: string };
        type SankeyLink = { source: string; target: string; value: number };

        const { inputs, consumptions, totalInput, totalConsumed } = flowData;

        const nodesSet: Set<string> = new Set();
        const links: SankeyLink[] = [];

        const inputEntries: [string, number][] = Object.entries(inputs).map(([key, val]) => [key.replace('Tags.', ''), Number(val)]);
        const fieldEntries: [string, number][] = Object.entries(consumptions).map(([key, val]) => [key.replace('Tags.', ''), Number(val)]);

        inputEntries.forEach(([node]) => nodesSet.add(node));
        fieldEntries.forEach(([field]) => nodesSet.add(field));
        nodesSet.add('Loss');

        const nodeShares: Record<string, number> = {};
        inputEntries.forEach(([node, supply]) => {
          nodeShares[node] = supply / totalInput;
        });

fieldEntries.forEach(([field, fieldConsumption]) => {
  const nodeContributions: { node: string; value: number }[] = [];

  inputEntries.forEach(([node]) => {
    const raw = fieldConsumption * nodeShares[node];
    nodeContributions.push({ node, value: raw });
  });

  let roundedSum = 0;
  const roundedContributions = nodeContributions.map((contrib, index) => {
    const isLast = index === nodeContributions.length - 1;
    const rounded = isLast
      ? +(fieldConsumption - roundedSum).toFixed(2)
      : +contrib.value.toFixed(2);
    roundedSum += rounded;
    return { ...contrib, value: rounded };
  });

  roundedContributions.forEach(({ node, value }) => {
    if (value > 0.01) {
      links.push({ source: node, target: field, value });
    }
  });

  // Log rounded vs actual for each field
  console.log(`Rounded total vs actual for ${field}:`, {
    actual: fieldConsumption,
    rounded: roundedContributions.reduce((sum, r) => sum + r.value, 0)
  });
});

const totalLoss = +(totalInput - totalConsumed).toFixed(2);
if (totalLoss > 0.1) {
  inputEntries.forEach(([node]) => {
    const lossShare = +(totalLoss * nodeShares[node]).toFixed(2);
    if (lossShare > 0.01) {
      links.push({ source: node, target: 'Loss', value: lossShare });
    }
  });
}



        const nodes: SankeyNode[] = Array.from(nodesSet).map(name => ({ name }));

        return {
          tooltip: { trigger: 'item', triggerOn: 'mousemove' },
          series: [
            {
              type: 'sankey',
              layout: 'none',
              emphasis: { focus: 'adjacency' },
              data: nodes,
              links,
              lineStyle: { color: 'gradient', curveness: 0.5 },
              label: { color: '#ffffff' }
            }
          ]
        };
      })()
    : {
        title: {
          text: 'Select custom date range to view Sankey chart',
          left: 'center',
          textStyle: { color: '#ccc', fontSize: 14 }
        }
      };

  return (
    <div className="space-y-8">
      {/* Global Time Selector */}
      <div className="flex gap-4 items-center p-4 bg-gray-800 rounded text-white">
        <label className="text-sm font-medium">Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="border p-2 rounded text-white bg-gray-800"
        >
          <option value="daily">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
        {mode === 'custom' && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded text-white"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded text-white"
            />
          </>
        )}
      </div>

      {/* Card: Consumption Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <ReactECharts option={barOption} style={{ height: '100%', width: '100%' }} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card: Cost vs Consumption */}
      <Card>
        <CardHeader>
          <CardTitle>Cost vs Consumption Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ReactECharts option={comparisonOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </CardContent>
      </Card>

      {/* Card: Sankey */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Flow Diagram (Sankey)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ReactECharts option={sankeyOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
