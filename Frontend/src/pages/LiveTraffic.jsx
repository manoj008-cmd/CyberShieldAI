import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

function LiveTraffic() {
  const [traffic, setTraffic] = useState([]);

  const loadTraffic = async () => {
    try {
      const res = await api.get("/traffic");
      setTraffic(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTraffic();

    const interval = setInterval(loadTraffic, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Attack":
        return { bg: "rgba(220, 38, 38, 0.2)", text: "#F87171", border: "1px solid #EF4444" };
      case "Suspicious":
        return { bg: "rgba(245, 158, 11, 0.2)", text: "#FBBF24", border: "1px solid #F59E0B" };
      default:
        return { bg: "rgba(34, 197, 94, 0.2)", text: "#86EFAC", border: "1px solid #22C55E" };
    }
  };

  return (
    <Layout>
      <h1 style={{ color: "white", marginBottom: "20px" }}>🌐 Live Network Traffic</h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Network Traffic Stream</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              color: "white",
              borderCollapse: "collapse",
              textAlign: "left"
            }}
          >
            <thead>
              <tr style={{ background: "#0F172A", borderBottom: "2px solid #334155" }}>
                <th style={{ padding: "14px 16px" }}>Time</th>
                <th style={{ padding: "14px 16px" }}>Protocol</th>
                <th style={{ padding: "14px 16px" }}>Packets/s</th>
                <th style={{ padding: "14px 16px" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {traffic.map((item, index) => {
                const statusStyle = getStatusStyle(item.status);
                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #334155",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px", fontFamily: "monospace" }}>{item.time}</td>
                    <td style={{ padding: "14px 16px", fontWeight: "600" }}>{item.protocol}</td>
                    <td style={{ padding: "14px 16px" }}>{item.packets.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          border: statusStyle.border,
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "inline-block"
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {traffic.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "30px", color: "#94A3B8" }}>
                    Analyzing network stream...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default LiveTraffic;