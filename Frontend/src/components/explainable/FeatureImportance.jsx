import { useEffect, useState } from "react";
import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import api from "../../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function FeatureImportance() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {

    const loadImportance = async () => {

      try {

        const res = await api.get("/importance");

        setChartData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Feature Importance",
              data: res.data.values,
              backgroundColor: "#3B82F6",
            },
          ],
        });

      } catch (err) {
        console.log(err);
      }

    };

    loadImportance();

  }, []);

  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        🧠 AI Feature Importance
      </h2>

      <Bar data={chartData} />
    </div>
  );
}

export default FeatureImportance;