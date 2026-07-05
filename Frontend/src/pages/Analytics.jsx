import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/layout/Layout";
import AttackDistribution from "../components/charts/AttackDistribution";
import AttackHistory from "../components/charts/AttackHistory";
function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    brute_force: 0,
    normal: 0,
    critical: 0,
    top_ips: [],
    attack_distribution: [],
  });

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAnalytics();

    const interval = setInterval(loadAnalytics, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>

      <h1
        style={{
          color: "white",
          marginBottom: "25px"
        }}
      >
        📊 CyberShield Analytics Dashboard
      </h1>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "25px"
        }}
      >

        <Card
          title="Total Attacks"
          value={stats.total}
          color="#EF4444"
        />

        <Card
          title="Brute Force"
          value={stats.brute_force}
          color="#F97316"
        />

        <Card
          title="Normal"
          value={stats.normal}
          color="#22C55E"
        />

        <Card
          title="Critical"
          value={stats.critical}
          color="#DC2626"
        />

      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <AttackDistribution
          data={stats.attack_distribution}
        />

        <div
          style={{
            background: "#1E293B",
            padding: "20px",
            borderRadius: "12px",
            color: "white"
          }}
        >
          <h2>Summary</h2>

          <hr />

          <p>Total Attacks : {stats.total}</p>

          <p>Brute Force : {stats.brute_force}</p>

          <p>Normal : {stats.normal}</p>

          <p>Critical : {stats.critical}</p>

        </div>

      </div>

      {/* Attack History Chart */}
      <div
        style={{
          background: "#1E293B",
          padding: "25px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "30px",
          boxShadow: "0 5px 12px rgba(0,0,0,.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📈 Attack History Timeline</h2>
        <div style={{ position: "relative" }}>
          <AttackHistory />
        </div>
      </div>

      {/* Top IP Table */}

      <div
        style={{
          background: "#1E293B",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
        }}
      >

        <h2>Top Attacked IP Addresses</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr>

              <th align="left">IP Address</th>

              <th align="left">Attack Count</th>

            </tr>

          </thead>

          <tbody>

            {stats.top_ips.map((ip, index) => (

              <tr key={index}>

                <td
                  style={{
                    padding: "10px 0"
                  }}
                >
                  {ip.ip}
                </td>

                <td>{ip.count}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#1E293B",
        borderLeft: `6px solid ${color}`,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        boxShadow: "0 5px 12px rgba(0,0,0,.3)"
      }}
    >

      <h3>{title}</h3>

      <h1
        style={{
          color
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Analytics;