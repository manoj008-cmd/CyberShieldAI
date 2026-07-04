import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AttackDistribution({ data }) {

  const chartData = {
    labels: data.map(item => item.attack),

    datasets: [
      {
        data: data.map(item => item.count),

        backgroundColor: [
          "#22C55E",
          "#EF4444",
          "#F59E0B",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "25px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        🥧 Attack Distribution
      </h2>

      <Pie data={chartData} />
    </div>
  );
}

export default AttackDistribution;