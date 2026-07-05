import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const acknowledgeAlert = async (id) => {
    try {
      await api.put(`/alerts/${id}`);
      loadAlerts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAlerts();

    const interval = setInterval(loadAlerts, 3000);

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
      <h1 style={{ color: "white", marginBottom: "20px" }}>🚨 Security Alerts</h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Alert Queue</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left"
            }}
          >
            <thead>
              <tr style={{ background: "#0F172A", borderBottom: "2px solid #334155" }}>
                <th style={{ padding: "14px 16px" }}>ID</th>
                <th style={{ padding: "14px 16px" }}>Attack</th>
                <th style={{ padding: "14px 16px" }}>IP Address</th>
                <th style={{ padding: "14px 16px" }}>Severity</th>
                <th style={{ padding: "14px 16px" }}>Confidence</th>
                <th style={{ padding: "14px 16px" }}>Status</th>
                <th style={{ padding: "14px 16px" }}>Created</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((alert) => {
                const sevStyle = getSeverityStyle(alert.severity);
                return (
                  <tr
                    key={alert.id}
                    style={{
                      borderBottom: "1px solid #334155",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>{alert.id}</td>
                    <td style={{ padding: "14px 16px", fontWeight: "600" }}>{alert.attack}</td>
                    <td style={{ padding: "14px 16px", fontFamily: "monospace" }}>{alert.ip}</td>
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
                        {alert.severity}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>{alert.confidence}%</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: alert.status === "New" ? "rgba(59, 130, 246, 0.2)" : "rgba(71, 85, 105, 0.4)",
                          color: alert.status === "New" ? "#93C5FD" : "#94A3B8",
                          border: alert.status === "New" ? "1px solid #3B82F6" : "1px solid #475569",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>{alert.created_at}</td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      {alert.status === "New" ? (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          style={{
                            background: "#2563EB",
                            color: "white",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "13px",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => (e.target.style.background = "#1D4ED8")}
                          onMouseLeave={(e) => (e.target.style.background = "#2563EB")}
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "#22C55E",
                            fontWeight: "bold",
                            fontSize: "14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          ✓ Done
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {alerts.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#94A3B8" }}>
                    No alerts currently active.
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

export default Alerts;