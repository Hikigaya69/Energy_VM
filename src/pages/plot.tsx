// import axios from 'axios';
// import ReactECharts from 'echarts-for-react';
// import React, { useEffect, useState } from 'react';

// type TimeVsFieldData = {
//     time: string;
//     tagId: string;
//     tagValue: number;
// };

// type XVsYData = {
//     time: string;
//     x: number;
//     y: number;
// };

// const TAG_OPTIONS = [
//     'Tags.Field_1',
//     'Tags.Field_2',
//     'Tags.Field_3',
//     'Tags.Field_4',
//     'Tags.Field_5',
//     'Tags.Node_A',
//     'Tags.Node_B',
//     'Faults.TotalLoss',
// ];

// type Mode = 'time-vs-field' | 'x-vs-y';

// const DataExplorer: React.FC = () => {
//     const [mode, setMode] = useState<Mode>('time-vs-field');
//     const [startDate, setStartDate] = useState(() => {
//         const d = new Date();
//         d.setDate(d.getDate() - 7);
//         return d.toISOString().substring(0, 10);
//     });
//     const [endDate, setEndDate] = useState(() => {
//         const d = new Date();
//         return d.toISOString().substring(0, 10);
//     });

//     const [selectedTag, setSelectedTag] = useState(TAG_OPTIONS[0]);
//     const [selectedTagX, setSelectedTagX] = useState(TAG_OPTIONS[0]);
//     const [selectedTagY, setSelectedTagY] = useState(TAG_OPTIONS[1]);

//     const [timeVsFieldData, setTimeVsFieldData] = useState<TimeVsFieldData[]>([]);
//     const [xVsYData, setXVsyData] = useState<XVsYData[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const fetchTimeVsField = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await axios.get<TimeVsFieldData[]>(
//                 'http://127.0.0.1:7055/oee/krbl/acquisition/timevfield',
//                 {
//                     params: { tagId: selectedTag, start: startDate, end: endDate },
//                 }
//             );

//             setTimeVsFieldData(
//                 res.data.map((item) => ({
//                     ...item,
//                     tagValue: 'tagValue' in item ? Number(item.tagValue) : (item as any).value,
//                     time: new Date(item.time).toLocaleString('en-IN', {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         day: '2-digit',
//                         month: 'short',
//                     }),
//                 }))
//             );
//         } catch {
//             setError('Failed to fetch Time vs Field data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchXVsY = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await axios.get<XVsYData[]>(
//                 'http://127.0.0.1:7055/oee/krbl/acquisition/xvsy',
//                 {
//                     params: {
//                         tagX: selectedTagX,
//                         tagY: selectedTagY,
//                         start: startDate,
//                         end: endDate,
//                     },
//                 }
//             );
//             setXVsyData(res.data);
//         } catch {
//             setError('Failed to fetch X vs Y data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (mode === 'time-vs-field') {
//             fetchTimeVsField();
//         } else {
//             fetchXVsY();
//         }
//     }, [mode, startDate, endDate, selectedTag, selectedTagX, selectedTagY]);

//     const timeVsFieldOption = {
//         tooltip: {
//             trigger: 'axis',
//             formatter: (params: any) => {
//                 const point = params[0];
//                 return `
//                     <strong>${selectedTag}</strong><br/>
//                     Time: ${point.axisValue}<br/>
//                     Value: ${point.data.toFixed(2)}
//                 `;
//             },
//         },
//         dataZoom: [
//             { type: 'inside', start: 80, end: 100 },
//             { type: 'slider', start: 80, end: 100 },
//         ],
//         xAxis: {
//             type: 'category',
//             data: timeVsFieldData.map(d => d.time),
//             axisLabel: { rotate: 45 },
//             name: 'Time',
//         },
//         yAxis: {
//             type: 'value',
//             name: selectedTag,
//             nameLocation: 'middle',
//             nameGap: 40,
//         },
//         series: [
//             {
//                 data: timeVsFieldData.map(d => d.tagValue),
//                 type: 'line',
//                 name: selectedTag,
//                 smooth: true,
//                 symbol: 'none',
//                 lineStyle: { width: 2, color: '#3b82f6' },
//             },
//         ],
//     };

//     const xVsYOption = {
//         tooltip: {
//             formatter: (params: any) => {
//                 const time = new Date(params.data[2]).toLocaleString();
//                 return `
//                     <strong>${selectedTagX}</strong>: ${params.data[0].toFixed(2)}<br/>
//                     <strong>${selectedTagY}</strong>: ${params.data[1].toFixed(2)}<br/>
//                     <strong>Time</strong>: ${time}
//                 `;
//             },
//         },
//         xAxis: {
//             name: selectedTagX,
//             type: 'value',
//             nameLocation: 'middle',
//             nameGap: 30,
//             axisLabel: { color: '#ccc' },
//             nameTextStyle: { color: '#fff' },
//         },
//         yAxis: {
//             name: selectedTagY,
//             type: 'value',
//             nameLocation: 'middle',
//             nameGap: 40,
//             axisLabel: { color: '#ccc' },
//             nameTextStyle: { color: '#fff' },
//         },
//         visualMap: {
//             min: xVsYData.length ? Math.min(...xVsYData.map(d => new Date(d.time).getTime())) : 0,
//             max: xVsYData.length ? Math.max(...xVsYData.map(d => new Date(d.time).getTime())) : 1,
//             dimension: 2,
//             orient: 'horizontal',
//             left: 'center',
//             bottom: 10,
//             text: ['New', 'Old'],
//             inRange: {
//                 color: ['#60a5fa', '#f59e0b', '#ef4444'],
//             },
//             formatter: (value: string | number | Date) => new Date(value).toLocaleDateString(),
//         },
//         series: [
//             {
//                 name: 'X vs Y',
//                 type: 'scatter',
//                 data: xVsYData.map(d => [d.x, d.y, new Date(d.time).getTime()]),
//                 symbolSize: 8,
//                 itemStyle: { opacity: 0.8 },
//             },
//         ],
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-4">
//             <h1 className="text-2xl font-semibold mb-4 text-white">Data Explorer (Ad-hoc Analysis)</h1>

//             <div className="mb-4 flex flex-wrap gap-4 items-center">
//                 <label className="text-white">
//                     <input
//                         type="radio"
//                         checked={mode === 'time-vs-field'}
//                         onChange={() => setMode('time-vs-field')}
//                         className="mr-1"
//                     />
//                     Time vs Field
//                 </label>
//                 <label className="text-white">
//                     <input
//                         type="radio"
//                         checked={mode === 'x-vs-y'}
//                         onChange={() => setMode('x-vs-y')}
//                         className="mr-1"
//                     />
//                     X vs Y
//                 </label>
//             </div>

//             <div className="mb-6 flex flex-wrap gap-4 items-center">
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-white">Start Date</label>
//                     <input
//                         type="date"
//                         value={startDate}
//                         onChange={e => setStartDate(e.target.value)}
//                         className="border rounded p-2 text-white"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-white">End Date</label>
//                     <input
//                         type="date"
//                         value={endDate}
//                         onChange={e => setEndDate(e.target.value)}
//                         className="border rounded p-2 text-white"
//                     />
//                 </div>

//                 {mode === 'time-vs-field' ? (
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Tag</label>
//                         <select
//                             value={selectedTag}
//                             onChange={e => setSelectedTag(e.target.value)}
//                             className="border rounded p-2 border-white text-white bg-gray-800"
//                         >
//                             {TAG_OPTIONS.map(tag => (
//                                 <option key={tag} value={tag}>
//                                     {tag}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 ) : (
//                     <>
//                         <div>
//                             <label className="block text-sm font-medium mb-1 text-white">Tag X</label>
//                             <select
//                                 value={selectedTagX}
//                                 onChange={e => setSelectedTagX(e.target.value)}
//                                 className="border rounded p-2 border-white bg-gray-800 text-white"
//                             >
//                                 {TAG_OPTIONS.map(tag => (
//                                     <option key={tag} value={tag}>
//                                         {tag}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-1 text-white">Tag Y</label>
//                             <select
//                                 value={selectedTagY}
//                                 onChange={e => setSelectedTagY(e.target.value)}
//                                 className="border rounded p-2 border-white bg-gray-800 text-white"
//                             >
//                                 {TAG_OPTIONS.map(tag => (
//                                     <option key={tag} value={tag}>
//                                         {tag}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </>
//                 )}
//             </div>

//             {loading && <p className="text-blue-600">Loading data...</p>}
//             {error && <p className="text-red-600">{error}</p>}

//             {!loading && !error && (xVsYData.length > 0 || timeVsFieldData.length > 0) && (
//                 <ReactECharts
//                     option={mode === 'time-vs-field' ? timeVsFieldOption : xVsYOption}
//                     style={{ height: 400, width: '100%' }}
//                 />
//             )}
//         </div>
//     );
// };

// export default DataExplorer;
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

type TimeVsFieldData = {
  time: string;
  tagId: string;
  tagValue: number;
};

type XVsYData = {
  time: string;
  x: number;
  y: number;
};

const TAG_OPTIONS = [
  'Tags.Field_1',
  'Tags.Field_2',
  'Tags.Field_3',
  'Tags.Field_4',
  'Tags.Field_5',
  'Tags.Node_A',
  'Tags.Node_B',
  'Faults.TotalLoss',
];

type Mode = 'time-vs-field' | 'x-vs-y';

const DataExplorer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('time-vs-field');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().substring(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().substring(0, 10));

  const [selectedTags, setSelectedTags] = useState<string[]>(['Tags.Field_1']);
  const [selectedTagX, setSelectedTagX] = useState(TAG_OPTIONS[0]);
  const [selectedTagY, setSelectedTagY] = useState(TAG_OPTIONS[1]);

  const [timeVsFieldData, setTimeVsFieldData] = useState<Record<string, { time: string; value: number }[]>>({});
  const [xVsYData, setXVsyData] = useState<XVsYData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimeVsField = async () => {
    if (!selectedTags.length) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<TimeVsFieldData[]>('http://127.0.0.1:7055/oee/krbl/acquisition/timevfield', {
        params: {
          tagIds: selectedTags.join(','),
          start: startDate,
          end: endDate,
        },
      });

      const grouped: Record<string, { time: string; value: number }[]> = {};
      res.data.forEach(item => {
        const timeLabel = new Date(item.time).toLocaleString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        });
        if (!grouped[item.tagId]) grouped[item.tagId] = [];
        grouped[item.tagId].push({ time: timeLabel, value: Number(item.tagValue ?? (item as any).value) });
      });

      setTimeVsFieldData(grouped);
    } catch {
      setError('Failed to fetch Time vs Field data');
    } finally {
      setLoading(false);
    }
  };

  const fetchXVsY = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<XVsYData[]>('http://127.0.0.1:7055/oee/krbl/acquisition/xvsy', {
        params: {
          tagX: selectedTagX,
          tagY: selectedTagY,
          start: startDate,
          end: endDate,
        },
      });
      setXVsyData(res.data);
    } catch {
      setError('Failed to fetch X vs Y data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'time-vs-field') {
      fetchTimeVsField();
    } else {
      fetchXVsY();
    }
  }, [mode, startDate, endDate, selectedTags.join(','), selectedTagX, selectedTagY]);

  const timeLabels = Object.values(timeVsFieldData)[0]?.map(d => d.time) ?? [];

  const timeVsFieldOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: selectedTags,
      textStyle: { color: '#fff' },
    },
    dataZoom: [{ type: 'inside', start: 80, end: 100 }, { type: 'slider', start: 80, end: 100 }],
    xAxis: {
      type: 'category',
      data: timeLabels,
      axisLabel: { rotate: 45 },
      name: 'Time',
    },
    yAxis: {
      type: 'value',
      name: 'Value',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: selectedTags.map(tagId => ({
      name: tagId,
      type: 'line',
      data: timeVsFieldData[tagId]?.map(d => d.value) ?? [],
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 2 },
    })),
  };

  const xVsYOption = {
    tooltip: {
      formatter: (params: any) => {
        const time = new Date(params.data[2]).toLocaleString();
        return `
          <strong>${selectedTagX}</strong>: ${params.data[0].toFixed(2)}<br/>
          <strong>${selectedTagY}</strong>: ${params.data[1].toFixed(2)}<br/>
          <strong>Time</strong>: ${time}
        `;
      },
    },
    xAxis: {
      name: selectedTagX,
      type: 'value',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { color: '#ccc' },
      nameTextStyle: { color: '#fff' },
    },
    yAxis: {
      name: selectedTagY,
      type: 'value',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: { color: '#ccc' },
      nameTextStyle: { color: '#fff' },
    },
    visualMap: {
      min: xVsYData.length ? Math.min(...xVsYData.map(d => new Date(d.time).getTime())) : 0,
      max: xVsYData.length ? Math.max(...xVsYData.map(d => new Date(d.time).getTime())) : 1,
      dimension: 2,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      text: ['New', 'Old'],
      inRange: { color: ['#60a5fa', '#f59e0b', '#ef4444'] },
      formatter: (value: number) => new Date(value).toLocaleDateString(),
    },
    series: [
      {
        name: 'X vs Y',
        type: 'scatter',
        data: xVsYData.map(d => [d.x, d.y, new Date(d.time).getTime()]),
        symbolSize: 8,
        itemStyle: { opacity: 0.8 },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Data Explorer (Ad-hoc Analysis)</h1>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <label className="text-white">
          <input type="radio" checked={mode === 'time-vs-field'} onChange={() => setMode('time-vs-field')} className="mr-1" />
          Time vs Field
        </label>
        <label className="text-white">
          <input type="radio" checked={mode === 'x-vs-y'} onChange={() => setMode('x-vs-y')} className="mr-1" />
          X vs Y
        </label>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded p-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded p-2 text-white"
          />
        </div>

        {mode === 'time-vs-field' ? (
          <div className="min-w-[250px]">
            <label className="block text-sm font-medium mb-1 text-white">Tags</label>
            <Select
              isMulti
              options={TAG_OPTIONS.map(tag => ({ label: tag, value: tag }))}
              value={TAG_OPTIONS.filter(tag => selectedTags.includes(tag)).map(tag => ({ label: tag, value: tag }))}
              onChange={(selectedOptions) => {
                const selected = selectedOptions.map(opt => opt.value);
                setSelectedTags(selected);
              }}
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#1f2937', color: 'white' }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#3b82f6' : '#1f2937',
                  color: 'white',
                }),
                multiValue: (base) => ({ ...base, backgroundColor: '#3b82f6', color: 'white' }),
                singleValue: (base) => ({ ...base, color: 'white' }),
                input: (base) => ({ ...base, color: 'white' }),
                menu: (base) => ({ ...base, backgroundColor: '#1f2937' }),
              }}
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Tag X</label>
              <select
                value={selectedTagX}
                onChange={e => setSelectedTagX(e.target.value)}
                className="border rounded p-2 border-white bg-gray-800 text-white"
              >
                {TAG_OPTIONS.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Tag Y</label>
              <select
                value={selectedTagY}
                onChange={e => setSelectedTagY(e.target.value)}
                className="border rounded p-2 border-white bg-gray-800 text-white"
              >
                {TAG_OPTIONS.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {loading && <p className="text-blue-600">Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ReactECharts
          option={mode === 'time-vs-field' ? timeVsFieldOption : xVsYOption}
          style={{ height: 400, width: '100%' }}
        />
      )}
    </div>
  );
};

export default DataExplorer;
