import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const MembershipChart = ({
  data = {},
}) => {
  const chartData = {
    labels: [
      "Active",
      "Expired",
      "Expiring Soon",
    ],

    datasets: [
      {
        data: [
          data.active || 0,
          data.expired || 0,
          data.expiring || 0,
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Membership Status
        </h2>

        <p className="text-sm text-slate-500">
          Current membership overview
        </p>
      </div>

      <div className="h-[300px]">
        <Doughnut
          data={chartData}
          options={options}
        />
      </div>

    </div>
  );
};

export default MembershipChart;