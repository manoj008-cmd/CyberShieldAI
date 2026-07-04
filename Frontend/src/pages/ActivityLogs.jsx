import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const res = await api.get("/activity-logs");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadLogs();

    const interval = setInterval(loadLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <h1 style={{ color: "white", marginBottom: "20px" }}>📋 Activity Logs</h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>SOC Operations History</h2>

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
                <th style={{ padding: "14px 16px" }}>User</th>
                <th style={{ padding: "14px 16px" }}>Action</th>
                <th style={{ padding: "14px 16px" }}>Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #334155",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 16px", fontWeight: "600" }}>{log.username}</td>
                  <td style={{ padding: "14px 16px" }}>{log.action}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "monospace" }}>{log.time}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "#94A3B8" }}>
                    No operations history recorded.
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

export default ActivityLogs;