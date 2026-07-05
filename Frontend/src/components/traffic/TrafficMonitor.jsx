import { useEffect, useState } from "react";
import api from "../../services/api";

function TrafficMonitor() {
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    const loadTraffic = async () => {
      try {
        const res = await api.get("/traffic");
        setTraffic(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTraffic();

    const timer = setInterval(loadTraffic, 1000);

    return () => clearInterval(timer);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Attack":
        return "#DC2626";
      case "Suspicious":
        return "#F59E0B";
      default:
        return "#22C55E";
    }
  };

  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        🌐 Live Network Traffic
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={header}>Time</th>
            <th style={header}>Protocol</th>
            <th style={header}>Packets/s</th>
            <th style={header}>Status</th>
          </tr>
        </thead>

        <tbody>
          {traffic.map((item, index) => (
            <tr key={index}>
              <td style={cell}>{item.time}</td>
              <td style={cell}>{item.protocol}</td>
              <td style={cell}>{item.packets}</td>

              <td
                style={{
                  ...cell,
                  color: statusColor(item.status),
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const header = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #475569",
};

const cell = {
  padding: "12px",
  borderBottom: "1px solid #334155",
};

export default TrafficMonitor;