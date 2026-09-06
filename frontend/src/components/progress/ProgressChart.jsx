import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ProgressChart = ({ progress = [] }) => {
  const sortedProgress = [...progress].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = {
    labels: sortedProgress.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),

    datasets: [
      {
        label: "Weight (kg)",
        data: sortedProgress.map((item) => item.weight),
        tension: 0.3,
      },
      {
        label: "Body Fat (%)",
        data: sortedProgress.map((item) => item.bodyFat || 0),
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-lg font-semibold mb-5">
        Progress Chart
      </h2>

      <Line data={data} />

    </div>
  );
};

export default ProgressChart;