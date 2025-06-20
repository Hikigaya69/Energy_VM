// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Legend,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis
// } from 'recharts';
// import { useEnergyData } from '../../hooks/useEnergyData';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// export const EnergyChart = ({
//   type = 'area',
//   height = 400,
// }) => {
//   const { data: energyData, isLoading } = useEnergyData();
//  // console.log("Energy Data:", energyData);
//   //console.log("Sample Data Types:", energyData?.slice(0, 5));


//   // const formatXAxis = (tickItem) => {
//   //   try {
//   //     return format(parseISO(tickItem), 'MMM dd');
//   //   } catch (error) {
//   //     console.error('Date parsing error:', error);
//   //     return tickItem;
//   //   }
//   // };

//   // const CustomTooltip = ({ active, payload, label }) => {
//   //   if (active && payload && payload.length) {
//   //     return (
//   //       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//   //         <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
//   //           {format(parseISO(label), 'MMMM dd, yyyy')}
//   //         </p>
//   //         {payload.map((entry, index) => (
//   //           <div key={index} className="flex items-center justify-between space-x-4">
//   //             <div className="flex items-center space-x-2">
//   //               <div
//   //                 className="w-3 h-3 rounded-full"
//   //                 style={{ backgroundColor: entry.color }}
//   //               />
//   //               <span className="text-sm text-gray-600 dark:text-gray-400">
//   //                 {entry.name}
//   //               </span>
//   //             </div>
//   //             <span className="text-sm font-medium text-gray-900 dark:text-white">
//   //               {entry.name === 'Cost' ? `₹${entry.value}` :
//   //                 entry.name === 'Efficiency' ? `${entry.value}%` :
//   //                   `${entry.value} kWh`}
//   //             </span>
//   //           </div>
//   //         ))}
//   //       </div>
//   //     );
//   //   }
//   //   return null;
//   // };

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!energyData || energyData.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <div className="text-center">
//               <p className="text-gray-500 dark:text-gray-400">No data available</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const ChartComponent = type === 'area' ? AreaChart : LineChart;

//   return (
//     <Card className="animate-slide-up">
//       <CardHeader>
//         <CardTitle>Energy Consumption Trends</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="w-full h-[400px]">

// <ResponsiveContainer width="100%" height={400}>
//   <AreaChart
//     data={energyData}
//     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//   >
//     <defs>
//       <linearGradient id="consumptionFill" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
//         <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
//       </linearGradient>
//       <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
//         <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
//       </linearGradient>
//     </defs>

//     <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//     <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} />
//     <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={12} />
//     <Tooltip />
//     <Legend />

//     <Area
//       type="monotone"
//       dataKey="consumption"
//       stroke="#3b82f6"
//       strokeWidth={2}
//       fill="url(#consumptionFill)"
//       name="Consumption"
//     />
//     <Area
//       type="monotone"
//       dataKey="cost"
//       stroke="#f97316"
//       strokeWidth={2}
//       fill="url(#costFill)"
//       name="Cost"
//     />
//   </AreaChart>
// </ResponsiveContainer>


//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// // Utility to format timestamps to hourly bucket (e.g., 2025-06-19T14:00:00)
// const getHourBucket = (timestamp) => {
//   const date = new Date(timestamp);
//   date.setMinutes(0, 0, 0);
//   return date.toISOString();
// };

// export const EnergyChart = ({ type = 'area', height = 400 }) => {
//   const [energyData, setEnergyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/currenttagvalues');
//       console.log('Fetched Data:', res.data); // Debugging line to check fetched data

//       const parsed = {};

//       res.data.data.forEach((entry) => {
//         const { tagId, time, tagValue } = entry;
//         if (!parsed[tagId]) parsed[tagId] = [];
//         parsed[tagId].push({ x: new Date(time), y: Number(tagValue) });
//       });

//       // Combine based on time index of Tags.Node_A
//       const rawCombined = parsed['Tags.Node_A']?.map((point, index) => ({
//         time: point.x.toISOString(),
//         bucket: getHourBucket(point.x),
//         supply: point.y,
//         field1: parsed['Tags.Field_1']?.[index]?.y || 0,
//         field2: parsed['Tags.Field_2']?.[index]?.y || 0,
//         field3: parsed['Tags.Field_3']?.[index]?.y || 0,
//         field4: parsed['Tags.Field_4']?.[index]?.y || 0,
//         field5: parsed['Tags.Field_5']?.[index]?.y || 0,
//         loss: parsed['Faults.TotalLoss']?.[index]?.y || 0,
//       })) || [];

//       // Group by hourly buckets
//       const bucketMap = {};
//       rawCombined.forEach((entry) => {
//         const { bucket, ...rest } = entry;
//         if (!bucketMap[bucket]) {
//           bucketMap[bucket] = { ...rest, time: bucket, count: 1 };
//         } else {
//           Object.keys(rest).forEach((key) => {
//             if (key !== 'time') bucketMap[bucket][key] += rest[key];
//           });
//           bucketMap[bucket].count++;
//         }
//       });

//       // Average values within each bucket
//       const aggregatedData = Object.values(bucketMap).map((entry) => {
//         const { count, ...rest } = entry;
//         const averaged = {};
//         Object.keys(rest).forEach((key) => {
//           averaged[key] = key === 'time' ? rest[key] : parseFloat((rest[key] / count).toFixed(2));
//         });
//         return averaged;
//       });

//       setEnergyData(aggregatedData);
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error fetching energy data:', err);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Initial fetch
//     const interval = setInterval(fetchData, 50000); // Every 50 seconds
//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!energyData || energyData.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <p className="text-gray-500 dark:text-gray-400">No data available</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const ChartComponent = type === 'area' ? AreaChart : LineChart;

//   return (
//     <Card className="animate-slide-up">
//       <CardHeader>
//         <CardTitle>Hourly Energy Trend</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="w-full h-[400px]">
//           <ResponsiveContainer width="100%" height={height}>
//             <ChartComponent
//               data={energyData}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
//                 </linearGradient>
//                 <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
//                   <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//               <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
//               <YAxis stroke="#9ca3af" fontSize={12} />
//               <Tooltip />
//               <Legend />

//               <Area
//                 type="monotone"
//                 dataKey="supply"
//                 stroke="#10b981"
//                 strokeWidth={2}
//                 fill="url(#supplyFill)"
//                 name="Supply (Node A)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="loss"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 fill="url(#lossFill)"
//                 name="Total Loss"
//               />

//               {[1, 2, 3, 4, 5].map((i) => (
//                 <Area
//                   key={i}
//                   type="monotone"
//                   dataKey={`field${i}`}
//                   stroke={`hsl(${i * 60}, 70%, 50%)`}
//                   strokeWidth={2}
//                   fillOpacity={0}
//                   name={`Field ${i}`}
//                 />
//               ))}
//             </ChartComponent>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };


// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Legend,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// //Format timestamps into 2-minute buckets
// const get2MinBucket = (timestamp) => {
//   const date = new Date(timestamp);
//   const minutes = date.getMinutes();
//   date.setMinutes(minutes - (minutes % 2), 0, 0);
//   return date.toISOString();
// };

// export const EnergyChart = ({ type = 'area', height = 400 }) => {
//   const [energyData, setEnergyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/currenttagvalues');

//       const parsed = {};

//       res.data.data.forEach((entry) => {
//         const { tagId, time, tagValue } = entry;
//         if (!parsed[tagId]) parsed[tagId] = [];
//         parsed[tagId].push({ x: new Date(time), y: Number(tagValue) });
//       });

//       const rawCombined = parsed['Tags.Node_A']?.map((point, index) => ({
//         time: point.x.toISOString(),
//         bucket: get2MinBucket(point.x),
//         supply: point.y,
//         field1: parsed['Tags.Field_1']?.[index]?.y || 0,
//         field2: parsed['Tags.Field_2']?.[index]?.y || 0,
//         field3: parsed['Tags.Field_3']?.[index]?.y || 0,
//         field4: parsed['Tags.Field_4']?.[index]?.y || 0,
//         field5: parsed['Tags.Field_5']?.[index]?.y || 0,
//         loss: parsed['Faults.TotalLoss']?.[index]?.y || 0,
//       })) || [];

//       const bucketMap = {};
//       rawCombined.forEach((entry) => {
//         const { bucket, ...rest } = entry;
//         if (!bucketMap[bucket]) {
//           bucketMap[bucket] = { ...rest, time: bucket, count: 1 };
//         } else {
//           Object.keys(rest).forEach((key) => {
//             if (key !== 'time') bucketMap[bucket][key] += rest[key];
//           });
//           bucketMap[bucket].count++;
//         }
//       });

//       const aggregatedData = Object.values(bucketMap).map((entry) => {
//         const { count, ...rest } = entry;
//         const averaged = {};
//         Object.keys(rest).forEach((key) => {
//           averaged[key] = key === 'time' ? rest[key] : parseFloat((rest[key] / count).toFixed(2));
//         });
//         return averaged;
//       });

//       setEnergyData(aggregatedData);
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error fetching energy data:', err);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Initial fetch
//     const interval = setInterval(fetchData, 50000); // Fetch every 50 sec
//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!energyData || energyData.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Energy Consumption Trends</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 flex items-center justify-center">
//             <p className="text-gray-500 dark:text-gray-400">No data available</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const ChartComponent = type === 'area' ? AreaChart : LineChart;

//   return (
//     <Card className="animate-slide-up">
//       <CardHeader>
//         <CardTitle>Energy Trend (2-Minute Interval)</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="w-full h-[400px]">
//           <ResponsiveContainer width="100%" height={height}>
//             <ChartComponent
//               data={energyData}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
//                 </linearGradient>
//                 <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
//                   <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//               <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
//               <YAxis stroke="#9ca3af" fontSize={12} />
//               <Tooltip />
//               <Legend />

//               <Area
//                 type="monotone"
//                 dataKey="supply"
//                 stroke="#10b981"
//                 strokeWidth={2}
//                 fill="url(#supplyFill)"
//                 name="Supply (Node A)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="loss"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 fill="url(#lossFill)"
//                 name="Total Loss"
//               />

//               {[1, 2, 3, 4, 5].map((i) => (
//                 <Area
//                   key={i}
//                   type="monotone"
//                   dataKey={`field${i}`}
//                   stroke={`hsl(${i * 60}, 70%, 50%)`}
//                   strokeWidth={2}
//                   fillOpacity={0}
//                   name={`Field ${i}`}
//                 />
//               ))}
//             </ChartComponent>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };


import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// Format timestamp into hourly buckets (e.g., 2025-06-20T10:00:00.000Z)
const getHourlyBucket = (timestamp) => {
  const date = new Date(timestamp);
  date.setMinutes(0, 0, 0);
  return date.toISOString();
};

export const EnergyChart = ({ type = 'area', height = 400 }) => {
  const [allRawData, setAllRawData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/currenttagvalues');

      const flatData = res.data.data.map(({ tagId, time, tagValue }) => ({
        tagId,
        time: new Date(time),
        bucket: getHourlyBucket(time),
        value: Number(tagValue),
      }));

      const updatedRawData = [...allRawData, ...flatData];
      const merged = [...allRawData, ...flatData];

// Remove duplicates based on tagId + exact timestamp
const deduped = merged.filter(
  (item, index, self) =>
    index === self.findIndex(
      (t) => t.tagId === item.tagId && t.time.getTime() === item.time.getTime()
    )
);

setAllRawData(deduped);

      setAllRawData(updatedRawData);

      // Organize by bucket and tagId
      const buckets = {};

      updatedRawData.forEach(({ tagId, bucket, value }) => {
        if (!buckets[bucket]) buckets[bucket] = {};
        if (!buckets[bucket][tagId]) {
          buckets[bucket][tagId] = { sum: value, count: 1 };
        } else {
          buckets[bucket][tagId].sum += value;
          buckets[bucket][tagId].count++;
        }
      });

      const finalData = Object.entries(buckets).map(([bucket, tags]) => ({
        time: bucket,
        supply: average(tags['Tags.Node_A']),
        supplyB: average(tags['Tags.Node_B']),
        loss: average(tags['Faults.TotalLoss']),
        field1: average(tags['Tags.Field_1']),
        field2: average(tags['Tags.Field_2']),
        field3: average(tags['Tags.Field_3']),
        field4: average(tags['Tags.Field_4']),
        field5: average(tags['Tags.Field_5']),
      }));
      console.log('Aggregated Final Data:', finalData);


      setEnergyData(finalData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching energy data:', err);
      setIsLoading(false);
    }


  };

  const average = (obj) => (obj ? parseFloat((obj.sum / obj.count).toFixed(2)) : 0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 50000);
    return () => clearInterval(interval);
  }, []);

  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!energyData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Energy Trend (Hourly)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height={height}>
            <ChartComponent
              data={energyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>

                {/* <linearGradient id="supplyBFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient> */}

              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="supply"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#supplyFill)"
                name="Supply (Node A)"
              />
              <Area
                type="monotone"
                dataKey="supplyB"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#supplyFill)"
                name="Supply (Node B)"
              />
              <Area
                type="monotone"
                dataKey="loss"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#lossFill)"
                name="Total Loss"
              />
              {[1, 2, 3, 4, 5].map((i) => (
                <Area
                  key={i}
                  type="monotone"
                  dataKey={`field${i}`}
                  stroke={`hsl(${i * 60}, 70%, 50%)`}
                  strokeWidth={2}
                  fillOpacity={0}
                  name={`Field ${i}`}
                />
              ))}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
