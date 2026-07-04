import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const loadIncidents = async () => {
    try {
      const res = await api.get("/incidents");
      setIncidents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadIncidents();

    const interval = setInterval(loadIncidents, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return { bg: "rgba(220, 38, 38, 0.2)", text: "#F87171", border: "1px solid #EF4444" };
      case "High":
        return { bg: "rgba(239, 68, 68, 0.15)", text: "#FCA5A5", border: "1px solid #F87171" };
      case "Medium":
        return { bg: "rgba(245, 158, 11, 0.2)", text: "#FBBF24", border: "1px solid #F59E0B" };
      default:
        return { bg: "rgba(34, 197, 94, 0.2)", text: "#86EFAC", border: "1px solid #22C55E" };
    }
  };

  return (
    <Layout>
      <h1 style={{ color: "white", marginBottom: "20px" }}>🚨 Incident Center</h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Active Incidents Log</h2>

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
                <th style={{ padding: "14px 16px" }}>ID</th>
                <th style={{ padding: "14px 16px" }}>Attack</th>
                <th style={{ padding: "14px 16px" }}>Source IP</th>
                <th style={{ padding: "14px 16px" }}>Severity</th>
                <th style={{ padding: "14px 16px" }}>Confidence</th>
                <th style={{ padding: "14px 16px" }}>Status</th>
                <th style={{ padding: "14px 16px" }}>Created</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((item) => {
                const sevStyle = getSeverityStyle(item.severity);
                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #334155",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>{item.id}</td>
                    <td style={{ padding: "14px 16px", fontWeight: "600" }}>{item.attack}</td>
                    <td style={{ padding: "14px 16px", fontFamily: "monospace" }}>{item.ip}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          backgroundColor: sevStyle.bg,
                          color: sevStyle.text,
                          border: sevStyle.border,
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "inline-block"
                        }}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>{item.confidence}%</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: item.status === "Open" ? "rgba(220, 38, 38, 0.2)" : "rgba(34, 197, 94, 0.2)",
                          color: item.status === "Open" ? "#F87171" : "#86EFAC",
                          border: item.status === "Open" ? "1px solid #DC2626" : "1px solid #22C55E",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>{item.created_at}</td>
                  </tr>
                );
              })}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#94A3B8" }}>
                    No incident reports logged.
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

export default Incidents;