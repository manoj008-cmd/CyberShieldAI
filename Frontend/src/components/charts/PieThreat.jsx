import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieThreat() {

  const data = {
    labels: [
      "Brute Force",
      "DDoS",
      "Normal",
      "Port Scan",
    ],

    datasets: [
  {
    data: [35, 25, 30, 10],

    backgroundColor: [
      "#EF4444",
      "#F59E0B",
      "#22C55E",
      "#3B82F6",
    ],

    borderWidth: 1,
  },
],
  };

  return (
    <div
      style={{
        background:"#1E293B",
        padding:"20px",
        borderRadius:"12px"
      }}
    >
      <h2 style={{color:"white"}}>
        Threat Distribution
      </h2>

      <Pie data={data}/>
    </div>
  );
}


export default PieThreat;