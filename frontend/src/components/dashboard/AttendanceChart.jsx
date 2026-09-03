import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AttendanceChart = ({
  data = [],
}) => {
  const chartData = {
    labels: data.map(
      (item) => item.date
    ),

    datasets: [
      {
        label: "Attendance",
        data: data.map(
          (item) => item.count
        ),
        borderRadius: 8,
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
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Attendance
        </h2>

        <p className="text-sm text-slate-500">
          Recent attendance
        </p>
      </div>

      <div className="h-[300px]">
        <Bar
          data={chartData}
          options={options}
        />
      </div>

    </div>
  );
};

export default AttendanceChart;