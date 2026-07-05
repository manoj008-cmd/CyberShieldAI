import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ThreatChart() {
  const data = {
    labels: [
      "10:00",
      "10:05",
      "10:10",
      "10:15",
      "10:20",
      "10:25",
      "10:30",
      "10:35",
      "10:40",
      "10:45",
    ],
    datasets: [
      {
        label: "Detected Attacks",
        data: [2, 5, 3, 8, 6, 10, 12, 9, 14, 11],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.25)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },

      title: {
        display: true,
        text: "Real-Time Attack Timeline",
        color: "white",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },

        grid: {
          color: "#334155",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "white",
        },

        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#1E293B",
        borderRadius: "12px",
        padding: "20px",
        height: "400px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default ThreatChart;