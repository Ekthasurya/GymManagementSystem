import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(
      (item) => item.month
    ),

    datasets: [
      {
        label: "Revenue",
        data: data.map(
          (item) => item.revenue
        ),
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) =>
            `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Revenue Overview
        </h2>

        <p className="text-sm text-slate-500">
          Monthly gym revenue
        </p>
      </div>

      <div className="h-[300px]">
        <Line
          data={chartData}
          options={options}
        />
      </div>

    </div>
  );
};

export default RevenueChart;