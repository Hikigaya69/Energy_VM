// // ShiftConsumptionExplorer.tsx

// import axios from 'axios';
// import ReactECharts from 'echarts-for-react';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import React, { useState } from 'react';

// type ShiftData = {
//     shift: 'Shift_1' | 'Shift_2' | 'Shift_3';
//     date: string;
//     tagId: string;
//     totalConsumption: number;
// };

// export const ShiftConsumptionExplorer: React.FC = () => {
//     const [start, setStart] = useState('');
//     const [end, setEnd] = useState('');
//     const [data, setData] = useState<ShiftData[]>([]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/shiftwisedata', {
//                 params: { start, end },
//             });

//             const res = response.data;

//             // Force to array — defensive coding
//             setData(Array.isArray(res) ? res : res.data || []);
//         } catch (error) {
//             console.error('Failed to fetch shift-wise data:', error);
//             setData([]);
//         }
//     };


//     const groupDataForChart = () => {
//         const grouped: Record<string, number> = {};

//         const allShifts = ['Shift_1', 'Shift_2', 'Shift_3'];
//         const allDates = Array.from(new Set(data.map((item) => item.date))).sort();

//         // Initialize all (date, shift) combinations
//         for (const date of allDates) {
//             for (const shift of allShifts) {
//                 const label = `${date} (${shift})`;
//                 grouped[label] = 0; // default to 0
//             }
//         }

//         // Fill with actual data
//         data.forEach(({ date, shift, totalConsumption }) => {
//             const label = `${date} (${shift})`;
//             grouped[label] += totalConsumption;
//         });

//         return {
//             labels: Object.keys(grouped),
//             values: Object.values(grouped),
//         };
//     };

//     const exportPDF = () => {
//         const doc = new jsPDF();

//         // Define table headers
//         const headers = [['Date', 'Shift', 'Tag ID', 'Consumption (kWh)']];

//         // Map your data into rows
//         const rows = data.map((row) => [
//             row.date,
//             row.shift,
//             row.tagId,
//             row.totalConsumption.toFixed(2),
//         ]);

//         // Add title
//         doc.setFontSize(14);
//         doc.text('Shift-wise Energy Consumption Report', 14, 15);

//         // Generate table
//         autoTable(doc, {
//             startY: 20,
//             head: headers,
//             body: rows,
//             styles: {
//                 fontSize: 10,
//             },
//             theme: 'grid',
//             headStyles: {
//                 fillColor: [59, 130, 246], // Tailwind blue-600
//                 textColor: [255, 255, 255],
//             },
//         });

//         // Save the PDF
//         doc.save('shift-consumption-report.pdf');
//     };


//     const chartData = groupDataForChart();

//     return (
//         <div className="p-4 space-y-6">
//             {/* Date Picker */}
//             <div className="flex gap-4 items-center">
//                 <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 rounded text-white" />
//                 <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 rounded text-white" />
//                 <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                     Fetch Data
//                 </button>
//                 <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//                     Download as PDF
//                 </button>
//             </div>

//             {/* Chart */}
//             <ReactECharts
//                 option={{
//                     tooltip: { trigger: 'axis' },
//                     xAxis: { type: 'category', data: chartData.labels },
//                     yAxis: { type: 'value', name: 'kWh' },
//                     series: [
//                         {
//                             name: 'Total Consumption',
//                             type: 'bar',
//                             data: chartData.values,
//                             itemStyle: { color: '#3b82f6' },
//                         }
//                     ]
//                 }}
//                 style={{ height: '400px', width: '100%' }}
//             />

//             {/* Table */}
//             <div id="shift-table" className="overflow-auto bg-white rounded shadow p-4">
//                 <table className="w-full border-collapse text-sm text-white-800">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2 text-left">Date</th>
//                             <th className="p-2 text-left">Shift</th>
//                             <th className="p-2 text-left">Tag</th>
//                             <th className="p-2 text-left">Consumption (kWh)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((row, i) => (
//                             <tr key={i} className="border-b">
//                                 <td className="p-2">{row.date}</td>
//                                 <td className="p-2">{row.shift}</td>
//                                 <td className="p-2">{row.tagId}</td>
//                                 <td className="p-2">{row.totalConsumption.toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };


import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useState } from 'react';

type ShiftData = {
    shift: 'Shift_1' | 'Shift_2' | 'Shift_3';
    date: string;
    tagId: string;
    totalConsumption: number;
    cost?: number; // Will be computed
};

// Cost slab function
const calculateCost = (units: number): number => {
    if (units <= 10000) return units * 3;
    if (units <= 30000) return 10000 * 3 + (units - 10000) * 5;
    return 10000 * 3 + 20000 * 5 + (units - 30000) * 8;
};

export const ShiftConsumptionExplorer: React.FC = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [data, setData] = useState<ShiftData[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:7055/oee/krbl/acquisition/shiftwisedata', {
                params: { start, end },
            });

            const res = response.data;

            const rawData: ShiftData[] = Array.isArray(res) ? res : res.data || [];

            // Calculate cost per row
            const updatedData = rawData.map((row) => ({
                ...row,
                cost: calculateCost(row.totalConsumption),
            }));

            setData(updatedData);
        } catch (error) {
            console.error('Failed to fetch shift-wise data:', error);
            setData([]);
        }
    };

    const groupDataForChart = () => {
        const grouped: Record<string, number> = {};
        const allShifts = ['Shift_1', 'Shift_2', 'Shift_3'];
        const allDates = Array.from(new Set(data.map((item) => item.date))).sort();

        for (const date of allDates) {
            for (const shift of allShifts) {
                const label = `${date} (${shift})`;
                grouped[label] = 0;
            }
        }

        data.forEach(({ date, shift, totalConsumption }) => {
            const label = `${date} (${shift})`;
            grouped[label] += totalConsumption;
        });

        return {
            labels: Object.keys(grouped),
            values: Object.values(grouped),
        };
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        const headers = [['Date', 'Shift', 'Tag ID', 'Consumption (kWh)', 'Cost (₹)']];
        const rows = data.map((row) => [
            row.date,
            row.shift,
            row.tagId,
            row.totalConsumption.toFixed(2),
            row.cost?.toFixed(2) || '0',
        ]);

        doc.setFontSize(14);
        doc.text('Shift-wise Energy Consumption Report', 14, 15);

        autoTable(doc, {
            startY: 20,
            head: headers,
            body: rows,
            styles: { fontSize: 10 },
            theme: 'grid',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: [255, 255, 255],
            },
        });

        doc.save('shift-consumption-report.pdf');
    };

    const totalCost = data.reduce((sum, row) => sum + (row.cost || 0), 0);
    const chartData = groupDataForChart();

    return (
        <div className="p-4 space-y-6">
            {/* Date Picker */}
            <div className="flex gap-4 items-center">
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 rounded text-white bg-gray-800" />
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 rounded text-white bg-gray-800" />
                <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Fetch Data
                </button>
                <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Download as PDF
                </button>
            </div>

            {/* Chart */}
            <ReactECharts
                option={{
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: chartData.labels },
                    yAxis: { type: 'value', name: 'kWh' },
                    series: [
                        {
                            name: 'Total Consumption',
                            type: 'bar',
                            data: chartData.values,
                            itemStyle: { color: '#3b82f6' },
                        }
                    ]
                }}
                style={{ height: '400px', width: '100%' }}
            />

            {/* Table */}
            <div id="shift-table" className="overflow-auto bg-white rounded shadow p-4">
                <table className="w-full border-collapse text-sm text-gray-900">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Shift</th>
                            <th className="p-2 text-left">Tag</th>
                            <th className="p-2 text-left">Consumption (kWh)</th>
                            <th className="p-2 text-left">Cost (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2">{row.date}</td>
                                <td className="p-2">{row.shift}</td>
                                <td className="p-2">{row.tagId}</td>
                                <td className="p-2">{row.totalConsumption.toFixed(2)}</td>
                                <td className="p-2">₹{(row.cost || 0).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="font-semibold bg-gray-50 border-t">
                            <td colSpan={4} className="p-2 text-right">Total Cost:</td>
                            <td className="p-2">₹{totalCost.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
